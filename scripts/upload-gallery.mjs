import { storagePut } from '../server/storage.js';
import { getDb } from '../server/db.js';
import { galleryImages } from '../drizzle/schema.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Gallery images to upload
const imagesToUpload = [
  { file: '1.43.SUPERIOR-KITCHEN.jpg', title: 'Superior Kitchen', category: 'Rooms', description: 'Modern kitchen with full amenities' },
  { file: '2.13.SUPERIOR-Kitchenette.jpg', title: 'Superior Kitchenette', category: 'Rooms', description: 'Compact kitchenette area' },
  { file: '5.5.jpg', title: 'Panoramic View', category: 'Views', description: 'Stunning panoramic sea view' },
  { file: '1.6.2.DELUX-WHOLEROOM.jpg', title: 'Delux Suite Overview', category: 'Rooms', description: 'Complete view of delux suite' },
  { file: '1.82.DELUXlivingarea.jpg', title: 'Delux Living Area', category: 'Rooms', description: 'Spacious living area with modern furniture' },
  { file: '2.3DELUXBathroom1.jpg', title: 'Delux Bathroom', category: 'Facilities', description: 'Luxury bathroom with premium fixtures' },
  { file: '1.3.SUPERIOR-WHOLEROOM2.jpg', title: 'Superior Suite', category: 'Rooms', description: 'Full superior suite layout' },
  { file: '3.SUPERIOR-Sofabed.jpg', title: 'Superior Sofa Bed', category: 'Rooms', description: 'Comfortable sofa bed area' },
  { file: '4.4INTERCONNECTED-ROOM.jpg', title: 'Interconnected Room', category: 'Rooms', description: 'Connected family room space' },
  { file: '1.7.DELUXKITCHENETTE.jpg', title: 'Delux Kitchenette', category: 'Rooms', description: 'Well-equipped kitchenette' },
  { file: '4.3Interconnectedfamilyroom.jpg', title: 'Family Room', category: 'Rooms', description: 'Spacious family accommodation' },
  { file: '1.5SUPERIOR-sittingarea(2).jpg', title: 'Superior Sitting Area', category: 'Rooms', description: 'Elegant sitting area' },
  { file: '5.41.jpg', title: 'Sea View', category: 'Views', description: 'Beautiful Black Sea view' },
  { file: '1.93.SUPERIOR-SofaBed2.jpg', title: 'Superior Sofa Bed 2', category: 'Rooms', description: 'Additional sleeping area' },
  { file: '1.5INTERCONNECTED-Sittingarea.jpg', title: 'Interconnected Sitting Area', category: 'Rooms', description: 'Shared sitting space' },
  { file: '5.1.jpg', title: 'Coastal View', category: 'Views', description: 'Batumi coastline view' },
  { file: '5.4.jpg', title: 'City View', category: 'Views', description: 'Batumi city panorama' },
  { file: '5.2.jpg', title: 'Sunset View', category: 'Views', description: 'Evening sea view' },
  { file: '7.3.jpg', title: 'Building Exterior', category: 'Exterior', description: 'Orbi City building facade' },
  { file: '1.8.3.jpg', title: 'Interior Detail', category: 'Amenities', description: 'Modern interior design' },
];

async function uploadGalleryImages() {
  console.log('Starting gallery image upload...');
  
  const uploadDir = '/home/ubuntu/upload';
  const db = await getDb();
  
  if (!db) {
    console.error('Database not available');
    process.exit(1);
  }

  let uploadedCount = 0;
  let order = 1;

  for (const imageInfo of imagesToUpload) {
    try {
      const filePath = path.join(uploadDir, imageInfo.file);
      
      // Check if file exists
      if (!fs.existsSync(filePath)) {
        console.log(`⚠️  File not found: ${imageInfo.file}`);
        continue;
      }

      // Read file
      const fileBuffer = fs.readFileSync(filePath);
      const fileExt = path.extname(imageInfo.file);
      
      // Generate unique key
      const timestamp = Date.now();
      const random = Math.random().toString(36).substring(7);
      const fileKey = `gallery/${timestamp}-${random}${fileExt}`;
      
      // Upload to S3
      console.log(`Uploading ${imageInfo.file}...`);
      const { url } = await storagePut(fileKey, fileBuffer, `image/${fileExt.slice(1)}`);
      
      // Insert into database
      await db.insert(galleryImages).values({
        title: imageInfo.title,
        description: imageInfo.description,
        imageUrl: url,
        category: imageInfo.category,
        order: order++,
      });
      
      console.log(`✅ Uploaded: ${imageInfo.title}`);
      uploadedCount++;
      
    } catch (error) {
      console.error(`❌ Error uploading ${imageInfo.file}:`, error.message);
    }
  }

  console.log(`\n🎉 Upload complete! ${uploadedCount}/${imagesToUpload.length} images uploaded successfully.`);
  process.exit(0);
}

uploadGalleryImages();
