# Bilingual (Arabic + English) Admin Guide

This guide explains how to use the bilingual input fields in the admin dashboard to manage content in both English and Arabic.

## Overview

Your application now supports full bilingual content management. All content can be entered in both English and Arabic, with Arabic content being optional. If Arabic content is not provided, the frontend will automatically fallback to English.

## Using Bilingual Input Fields

### BilingualInput Component

For single-line text and textarea fields, use the `BilingualInput` component:

```tsx
import BilingualInput from './BilingualInput';

<BilingualInput
  label="Category Name"
  nameEn="name"
  nameAr="name_ar"
  valueEn={formData.name}
  valueAr={formData.name_ar}
  onChange={(e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))}
  required
  placeholder="e.g., Industrial Coatings"
/>
```

### BilingualArrayInput Component

For array fields (like features, applications, instructions), use the `BilingualArrayInput` component:

```tsx
import BilingualArrayInput from './BilingualArrayInput';

<BilingualArrayInput
  label="Features"
  valueEn={formData.features}
  valueAr={formData.features_ar}
  onChangeEn={(items) => setFormData(prev => ({ ...prev, features: items }))}
  onChangeAr={(items) => setFormData(prev => ({ ...prev, features_ar: items }))}
/>
```

## Admin Forms to Update

The following admin forms should be updated to support bilingual input:

### 1. Product Categories (✅ Already Updated)
- **Fields**: name, description
- **Status**: Completed with BilingualInput

### 2. Products Manager
- **Text Fields**: name, description, technical_description
- **Array Fields**: features, applications, instructions, storage, safety_precautions, safety_first_aid
- **Update**: Add `name_ar`, `description_ar`, `technical_description_ar` and array equivalents with `_ar` suffix

### 3. FAQ Manager
- **Categories**: name, description
- **Items**: question, answer
- **Update**: Add corresponding `_ar` fields for all text content

### 4. Troubleshooting Manager
- **Categories**: name, description
- **Items**: problem, solution
- **Update**: Add corresponding `_ar` fields

### 5. Bulletins Manager
- **Fields**: title, short_description
- **Update**: Add `title_ar`, `short_description_ar`
- **Note**: Content is stored as JSON - consider if full bilingual content editing is needed

### 6. Pages Manager
- **Fields**: title, meta_description
- **Update**: Add `title_ar`, `meta_description_ar`

## Example: Updating a Form

Here's an example of how to update an admin form to support bilingual input:

### Before:
```tsx
const [formData, setFormData] = useState({
  name: '',
  description: '',
});

// In the form:
<input
  value={formData.name}
  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
/>
```

### After:
```tsx
const [formData, setFormData] = useState({
  name: '',
  name_ar: '',
  description: '',
  description_ar: '',
});

// In the form:
<BilingualInput
  label="Name"
  nameEn="name"
  nameAr="name_ar"
  valueEn={formData.name}
  valueAr={formData.name_ar}
  onChange={(e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))}
  required
/>
```

## Frontend Display Logic

On the frontend, components automatically detect the current language and display the appropriate content:

```tsx
const { i18n } = useTranslation();
const isRTL = i18n.language === 'ar';

// Display name based on language
<h1>{isRTL && category.name_ar ? category.name_ar : category.name}</h1>
```

## Database Schema

All tables now have corresponding `_ar` fields:

- Text fields: `name_ar`, `description_ar`, etc.
- Array fields: `features_ar`, `applications_ar`, etc.
- All Arabic fields are **nullable** (optional)

## Best Practices

1. **English is Required**: Always fill in English fields as they serve as the fallback
2. **Arabic is Optional**: Arabic fields can be left empty - the system will show English content
3. **Consistency**: Try to provide Arabic translations for all content to provide the best user experience
4. **RTL Text Direction**: Arabic text inputs automatically use RTL (right-to-left) direction
5. **Testing**: After adding content, switch the language on the frontend to verify both versions display correctly

## Language Switcher

Users can switch between English and Arabic using the globe icon in the header. The switch:
- Changes all UI text to the selected language
- Changes text direction (LTR for English, RTL for Arabic)
- Displays Arabic content if available, otherwise shows English
- Preference is saved in browser localStorage

## Technical Details

- **i18n Framework**: react-i18next
- **Translation Files**: `/src/i18n/locales/en.json` and `/src/i18n/locales/ar.json`
- **RTL Support**: CSS rules in `/src/index.css`
- **Language Detection**: Automatically detects from localStorage or browser settings
