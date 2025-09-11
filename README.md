# Al Azmeh Paints Website - Backend Documentation

## Overview
Complete backend system for managing product bulletins and system details with comprehensive CRUD operations, file uploads, and audit logging.

## 🗄️ Database Schema

### Core Tables

#### Product Bulletins System
```sql
-- Main bulletin data
product_bulletins (
  id, product_id, title, short_description, 
  cover_image_url, datasheet_url, manual_url,
  is_published, created_at, updated_at, created_by, updated_by
)

-- Technical specifications (property-value-standard table)
product_technical_specs (
  id, product_bulletin_id, property, value, standard, sort_order
)

-- Key features (bullet point lists)
product_key_features (id, product_bulletin_id, feature, sort_order)
product_applications (id, product_bulletin_id, application, sort_order) 
product_storage_requirements (id, product_bulletin_id, requirement, sort_order)

-- Rich text instructions
product_instructions (id, product_bulletin_id, content, content_type)

-- Safety information (precautions + first aid)
product_safety_info (
  id, product_bulletin_id, info_type, information, sort_order
)
```

#### System Details
```sql
-- Rich text system pages
system_details (
  id, system_id, title, content, content_type,
  meta_description, is_published, created_at, updated_at, created_by, updated_by
)
```

#### Audit & Security
```sql
-- Change tracking
content_audit_log (
  id, table_name, record_id, operation, old_data, new_data,
  changed_by, changed_at, ip_address, user_agent
)
```

## 🔧 API Endpoints

### Product Bulletins API

#### Get Product Bulletin
```typescript
GET /api/products/{productId}/bulletin

Response:
{
  "id": "uuid",
  "product_id": "uuid", 
  "title": "Premium Zinc Primer Technical Bulletin",
  "short_description": "High-performance zinc-rich primer...",
  "cover_image_url": "https://...",
  "datasheet_url": "https://...",
  "is_published": true,
  "technical_specs": [
    {
      "property": "Zinc Content",
      "value": "80-85%", 
      "standard": "ASTM D520"
    }
  ],
  "key_features": [
    {"feature": "Excellent corrosion protection"}
  ],
  "applications": [
    {"application": "Steel structures"}
  ],
  "storage_requirements": [
    {"requirement": "Store in cool, dry place"}
  ],
  "safety_info": [
    {
      "info_type": "precaution",
      "information": "Wear protective clothing"
    }
  ]
}
```

#### Create/Update Bulletin Sections
```typescript
POST /api/bulletins/{bulletinId}/technical-specs
{
  "property": "Coverage",
  "value": "8-10 m²/L", 
  "standard": "ISO 6504",
  "sort_order": 0
}

POST /api/bulletins/{bulletinId}/features
{
  "feature": "Superior adhesion",
  "sort_order": 0
}

POST /api/bulletins/{bulletinId}/applications  
{
  "application": "Marine environments",
  "sort_order": 0
}

POST /api/bulletins/{bulletinId}/storage-requirements
{
  "requirement": "Keep container tightly closed",
  "sort_order": 0
}

POST /api/bulletins/{bulletinId}/safety-info
{
  "info_type": "precaution", // or "first_aid"
  "information": "Ensure adequate ventilation",
  "sort_order": 0
}
```

### System Details API

#### Get System Details
```typescript
GET /api/systems/{systemId}/details

Response:
{
  "id": "uuid",
  "system_id": "concrete-exterior",
  "title": "Concrete Exterior Systems",
  "content": {
    "type": "doc",
    "content": [
      {
        "type": "heading",
        "attrs": {"level": 1},
        "content": [{"type": "text", "text": "Overview"}]
      },
      {
        "type": "paragraph", 
        "content": [{"type": "text", "text": "Advanced coating systems..."}]
      }
    ]
  },
  "content_type": "html",
  "is_published": true
}
```

#### Create/Update System Details
```typescript
POST /api/systems/{systemId}/details
{
  "title": "Concrete Exterior Systems",
  "content": {
    "type": "doc",
    "content": [...]
  },
  "content_type": "html",
  "meta_description": "Advanced coating systems...",
  "is_published": true
}

PATCH /api/systems/{systemId}/details
{
  "title": "Updated Title",
  "content": {...},
  "is_published": false
}
```

### File Upload API

#### Upload Files
```typescript
POST /api/uploads/{bucket}/{path}
Content-Type: multipart/form-data

Response:
{
  "url": "https://storage-url/path/filename.pdf",
  "filename": "datasheet.pdf",
  "size": 1024,
  "type": "application/pdf"
}

Supported buckets:
- product-documents (PDFs, docs)
- product-images (JPG, PNG, WebP)
- system-media (all media types)
```

## 🛡️ Authentication & Authorization

### Role-Based Access Control
```typescript
Roles:
- admin: Full CRUD access to all content
- editor: CRUD access to content, no user management  
- viewer: Read-only access to published content
- public: Read access to published content only

Implementation:
- Row Level Security (RLS) policies on all tables
- JWT authentication via Supabase Auth
- Role checking in API middleware
```

### RLS Policy Examples
```sql
-- Bulletins: Public can read published, authenticated can manage all
CREATE POLICY "public_read_published_bulletins" ON product_bulletins
  FOR SELECT TO public USING (is_published = true);

CREATE POLICY "authenticated_full_access_bulletins" ON product_bulletins  
  FOR ALL TO authenticated USING (true);

-- System Details: Similar pattern
CREATE POLICY "public_read_published_systems" ON system_details
  FOR SELECT TO public USING (is_published = true);
```

## 🔍 Audit Trail

### Automatic Change Logging
```typescript
// All content changes are automatically logged
content_audit_log entries include:
- table_name: Which table was modified
- record_id: Which record was changed
- operation: INSERT/UPDATE/DELETE
- old_data: Previous state (JSON)
- new_data: New state (JSON) 
- changed_by: User who made the change
- changed_at: Timestamp
- ip_address: Request IP
- user_agent: Browser info
```

### Audit Log API
```typescript
GET /api/audit/{tableName}/{recordId}

Response:
[
  {
    "operation": "UPDATE",
    "old_data": {"title": "Old Title"},
    "new_data": {"title": "New Title"}, 
    "changed_by": "user-id",
    "changed_at": "2025-01-27T10:00:00Z"
  }
]
```

## 📁 File Upload & Storage

### Implementation Notes
```typescript
// Supabase Storage Integration
- Buckets: product-documents, product-images, system-media
- File naming: {timestamp}-{random}.{extension}
- URL generation: Public URLs for published content
- File validation: Type, size, virus scanning

// Security Considerations  
- Authenticated upload required
- File type validation
- Size limits (images: 5MB, documents: 10MB)
- Virus scanning (recommend ClamAV integration)
- CDN integration for performance
```

### Storage Structure
```
storage/
├── product-documents/
│   ├── bulletins/
│   │   ├── datasheets/
│   │   └── manuals/
├── product-images/
│   ├── covers/
│   └── gallery/
└── system-media/
    ├── images/
    └── documents/
```

## 🚀 Local Development Setup

### Prerequisites
```bash
- Node.js 18+
- Supabase CLI (optional, for local dev)
- Git
```

### Installation
```bash
# Clone repository
git clone <repository-url>
cd al-azmeh-paints

# Install dependencies
npm install

# Environment setup
cp .env.example .env
# Configure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY

# Run migrations (if using Supabase CLI)
supabase migration up

# Start development server
npm run dev
```

### Environment Variables
```bash
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

## 📋 Example Usage

### Creating a Complete Product Bulletin
```typescript
// 1. Create bulletin
const bulletin = await api.createProductBulletin({
  product_id: "product-uuid",
  title: "Product Technical Bulletin", 
  short_description: "Brief description",
  is_published: false
});

// 2. Add technical specifications
await api.createTechnicalSpec({
  product_bulletin_id: bulletin.id,
  property: "Viscosity",
  value: "85-95 KU", 
  standard: "ASTM D562",
  sort_order: 0
});

// 3. Add key features
await api.createKeyFeature({
  product_bulletin_id: bulletin.id,
  feature: "Excellent durability",
  sort_order: 0
});

// 4. Add applications
await api.createApplication({
  product_bulletin_id: bulletin.id, 
  application: "Industrial equipment",
  sort_order: 0
});

// 5. Add safety information
await api.createSafetyInfo({
  product_bulletin_id: bulletin.id,
  info_type: "precaution",
  information: "Wear protective equipment",
  sort_order: 0
});

// 6. Publish
await api.updateProductBulletin(bulletin.id, {
  is_published: true
});
```

### Creating a System Detail Page
```typescript
await api.createSystemDetail({
  system_id: "concrete-repair",
  title: "Concrete Repair Systems", 
  content: {
    "type": "doc",
    "content": [
      {
        "type": "heading",
        "attrs": {"level": 1},
        "content": [{"type": "text", "text": "Overview"}]
      },
      {
        "type": "paragraph",
        "content": [{"type": "text", "text": "Comprehensive repair solutions..."}] 
      }
    ]
  },
  content_type: "html",
  meta_description: "SEO description",
  is_published: true
});
```

## 🔧 Admin Interface Features

### Product Bulletin Manager (`/admin/product-bulletins`)
- **Product Selection**: Sidebar with searchable product list
- **Tabbed Interface**: Separate tabs for each bulletin section
- **File Upload**: Drag & drop for images and documents
- **Real-time Preview**: Live preview of bulletin content
- **Bulk Operations**: Import/export bulletin data

### System Details Manager (`/admin/system-details`)
- **Rich Text Editor**: WYSIWYG editor for content creation
- **Media Management**: Upload and insert images, documents
- **SEO Controls**: Meta descriptions and publish status
- **Version History**: View change history with audit log

### Product Filters Manager (`/admin/product-filters`)
- **Dynamic Filters**: Create custom filter types
- **Nested Categories**: Multi-level filter organization
- **Sort Management**: Drag & drop reordering
- **Bulk Import**: CSV import for filter values

## 🔒 Security Features

- **Row Level Security**: Database-level access control
- **JWT Authentication**: Secure token-based auth
- **Input Validation**: Server-side validation for all inputs
- **XSS Protection**: Content sanitization
- **CSRF Protection**: Cross-site request forgery prevention
- **Rate Limiting**: API endpoint protection
- **Audit Logging**: Complete change tracking

## 🚀 Production Deployment

### Performance Optimization
- **Database Indexing**: Optimized queries for all endpoints
- **CDN Integration**: Fast file delivery
- **Caching Strategy**: Redis for frequently accessed data
- **Image Optimization**: WebP conversion and resizing

### Monitoring & Analytics
- **Error Tracking**: Structured error logging
- **Performance Monitoring**: Query performance metrics
- **Usage Analytics**: Content access patterns
- **Health Checks**: System status monitoring

## 📊 Future Expansion

The system is designed for easy expansion:

1. **New Filter Types**: Add via admin interface
2. **Custom Bulletin Sections**: Extend with new tables
3. **Multi-language Support**: i18n ready structure
4. **Workflow Management**: Approval processes
5. **API Versioning**: Backward compatibility support
6. **Advanced Editor**: Rich text editor upgrades
7. **Bulk Operations**: Import/export functionality
8. **Advanced Search**: Full-text search capabilities

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/new-feature`
3. Make changes and test thoroughly
4. Submit pull request with detailed description
5. Ensure all tests pass and follow coding standards

## 📞 Technical Support

For technical support or questions:
- Email: tech@al-azmeh-paints.com
- Documentation: /docs/api
- Issue Tracker: GitHub Issues