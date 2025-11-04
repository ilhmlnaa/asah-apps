import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { UploadRequestSchema } from './uploads.schemas';
import { UploadResponses } from './uploads.responses';

export function ApiImageUpload() {
  return applyDecorators(
    ApiOperation({
      summary: 'Upload image file with optimization and CDN delivery',
      description: `
        Professional image upload endpoint with comprehensive processing and optimization.
        
        **File Processing & Optimization:**
        - Automatic format conversion and optimization for web delivery
        - Progressive JPEG encoding for faster loading
        - WebP format support for modern browsers with better compression
        - Intelligent quality adjustment based on image content
        - Automatic resizing and thumbnail generation options
        
        **Supported File Formats:**
        - JPEG/JPG: High-quality photos and complex images
        - PNG: Images with transparency and simple graphics
        - GIF: Animated images and simple graphics
        - WebP: Modern format with superior compression
        - BMP: Basic bitmap images (auto-converted to optimized format)
        
        **Upload Specifications:**
        - Maximum file size: 5MB per upload
        - Minimum dimensions: 100x100 pixels
        - Maximum dimensions: 4096x4096 pixels
        - Automatic EXIF data stripping for privacy
        - Malware scanning and security validation
        
        **CDN & Performance Features:**
        - Global CDN distribution for fast worldwide access
        - Automatic image optimization based on device and network
        - Responsive image delivery with multiple resolutions
        - Browser-specific format selection (WebP for supported browsers)
        - Aggressive caching with proper cache headers
        
        **Business Use Cases:**
        - User Profile Photos: Avatar uploads with automatic face detection
        - Product Images: E-commerce product photography with zoom support
        - Marketing Materials: Campaign images with brand consistency
        - Document Uploads: Scanned documents with OCR preparation
        - Content Management: Blog posts and article illustrations
        
        **Security & Compliance:**
        - File type validation and malware scanning
        - EXIF data removal for privacy protection
        - Content moderation integration ready
        - GDPR compliance with data handling transparency
        - Audit trail for upload tracking and management
        
        **Integration Examples:**
        - Frontend: Direct upload with progress tracking
        - Mobile Apps: Camera integration with real-time upload
        - CMS Systems: Drag & drop file management
        - API Clients: Programmatic bulk upload capabilities
        - Third-party Services: Webhook notifications for processing completion
        
        **Error Handling & Recovery:**
        - Comprehensive validation with detailed error messages
        - Automatic retry logic for transient failures
        - Partial upload recovery for large files
        - Graceful degradation for unsupported formats
        - Rate limiting protection with clear feedback
        
        **Analytics & Monitoring:**
        - Upload success/failure rate tracking
        - File size and format distribution analytics
        - Performance metrics and optimization insights
        - User behavior analysis for UX improvements
        - Storage usage monitoring and cost optimization
      `,
      tags: ['File Uploads'],
    }),
    ApiConsumes('multipart/form-data'),
    ApiBody({
      description:
        'Image file upload with comprehensive validation and processing',
      schema: UploadRequestSchema,
    }),
    ...UploadResponses,
  );
}
