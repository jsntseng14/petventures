import { createUploadthing, type FileRouter } from "uploadthing/server";

// 🛑 Fail early if env is missing
if (!process.env.UPLOADTHING_TOKEN || !process.env.UPLOADTHING_APP_ID) {
  throw new Error("❌ Missing UploadThing env vars");
}

// ✅ Patch in TOKEN as expected secret (backward compatibility)
process.env.UPLOADTHING_SECRET = process.env.UPLOADTHING_TOKEN;

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB" } }).onUploadComplete(
    async ({ file }) => {
      console.log("✅ Upload complete:", file.url);
    }
  ),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
