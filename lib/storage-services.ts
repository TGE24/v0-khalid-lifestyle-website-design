import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage"
import { storage } from "./firebase"

// Upload image to Firebase Storage
export async function uploadImage(
  file: File,
  eventId: string,
): Promise<{ success: boolean; url?: string; error?: any }> {
  try {
    // Create a unique filename
    const timestamp = Date.now()
    const sanitizedFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_")
    const fileName = `events/${eventId}/${timestamp}_${sanitizedFileName}`

    // Create storage reference
    const storageRef = ref(storage, fileName)

    // Upload file
    const snapshot = await uploadBytes(storageRef, file)

    // Get download URL
    const downloadURL = await getDownloadURL(snapshot.ref)

    return { success: true, url: downloadURL }
  } catch (error) {
    console.error("[v0] Error uploading image:", error)
    return { success: false, error }
  }
}

// Upload multiple images
export async function uploadMultipleImages(
  files: File[],
  eventId: string,
  onProgress?: (current: number, total: number) => void,
): Promise<{ success: boolean; urls?: string[]; errors?: any[] }> {
  const urls: string[] = []
  const errors: any[] = []

  for (let i = 0; i < files.length; i++) {
    const result = await uploadImage(files[i], eventId)

    if (result.success && result.url) {
      urls.push(result.url)
    } else {
      errors.push(result.error)
    }

    if (onProgress) {
      onProgress(i + 1, files.length)
    }
  }

  return {
    success: errors.length === 0,
    urls,
    errors: errors.length > 0 ? errors : undefined,
  }
}

// Delete image from Firebase Storage
export async function deleteImage(imageUrl: string): Promise<{ success: boolean; error?: any }> {
  try {
    // Extract the path from the URL
    const urlParts = imageUrl.split("/o/")
    if (urlParts.length < 2) {
      return { success: false, error: "Invalid image URL" }
    }

    const pathWithParams = urlParts[1]
    const path = decodeURIComponent(pathWithParams.split("?")[0])

    // Create storage reference
    const storageRef = ref(storage, path)

    // Delete file
    await deleteObject(storageRef)

    return { success: true }
  } catch (error) {
    console.error("[v0] Error deleting image:", error)
    return { success: false, error }
  }
}

// Upload video to Firebase Storage
export async function uploadVideo(
  file: File,
  eventId: string,
): Promise<{ success: boolean; url?: string; error?: any }> {
  try {
    // Create a unique filename
    const timestamp = Date.now()
    const sanitizedFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_")
    const fileName = `events/${eventId}/videos/${timestamp}_${sanitizedFileName}`

    // Create storage reference
    const storageRef = ref(storage, fileName)

    // Upload file
    const snapshot = await uploadBytes(storageRef, file)

    // Get download URL
    const downloadURL = await getDownloadURL(snapshot.ref)

    return { success: true, url: downloadURL }
  } catch (error) {
    console.error("[v0] Error uploading video:", error)
    return { success: false, error }
  }
}

// Helper to determine file type
export function getFileType(file: File): "image" | "video" | "unknown" {
  if (file.type.startsWith("image/")) return "image"
  if (file.type.startsWith("video/")) return "video"
  return "unknown"
}

// Helper to validate file size (max 10MB for images, 100MB for videos)
export function validateFileSize(file: File): { valid: boolean; message?: string } {
  const fileType = getFileType(file)
  const maxSize = fileType === "image" ? 10 * 1024 * 1024 : 100 * 1024 * 1024 // 10MB or 100MB

  if (file.size > maxSize) {
    const maxSizeMB = fileType === "image" ? "10MB" : "100MB"
    return {
      valid: false,
      message: `File size exceeds ${maxSizeMB}. Please choose a smaller file.`,
    }
  }

  return { valid: true }
}
