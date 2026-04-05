import multer from "multer";
import path from "path";
import fs from "fs";

const ensureDir = (dir: string) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Organize by field type
    let folder = "uploads/documents/";

    if (file.fieldname === "profile_image") {
      folder = "uploads/profiles/";
    } else if (
      file.fieldname === "document_front" ||
      file.fieldname === "document_back"
    ) {
      folder = "uploads/documents/";
    }

    ensureDir(folder);
    cb(null, folder);
  },

  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    // Cleaner filename: document_front-123456789.jpg
    cb(null, `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`);
  },
});

const fileFilter = (
  req: any,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Only JPEG, PNG, and JPG are allowed."));
  }
};

export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
});

// Named exports for specific use cases
export const uploadDocuments = upload.fields([
  { name: "document_front", maxCount: 1 },
  { name: "document_back", maxCount: 1 },
]);

export const uploadProfile = upload.single("profile_image");