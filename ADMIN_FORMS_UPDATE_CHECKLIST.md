# Admin Forms Bilingual Update Checklist

This checklist shows exactly what needs to be done to update each remaining admin form to support bilingual (EN/AR) input.

## ✅ Completed

- [x] **ProductCategoriesManager** - Updated with BilingualInput for name and description
- [x] **Database Schema** - All tables now have `_ar` fields
- [x] **Header Component** - Uses translations and displays Arabic category/item names
- [x] **Hero Component** - Displays Arabic category names and descriptions

## 📋 Remaining Forms to Update

### 1. ProductsManager / ProductForm

**Import Required:**
```tsx
import BilingualInput from './BilingualInput';
import BilingualArrayInput from './BilingualArrayInput';
```

**State Updates:**
```tsx
// Add these fields to formData:
name_ar: '',
description_ar: '',
technical_description_ar: '',
features_ar: [],
applications_ar: [],
instructions_ar: [],
storage_ar: [],
safety_precautions_ar: [],
safety_first_aid_ar: [],
```

**Form Fields to Replace:**

```tsx
// Replace name input:
<BilingualInput
  label="Product Name"
  nameEn="name"
  nameAr="name_ar"
  valueEn={formData.name}
  valueAr={formData.name_ar}
  onChange={handleInputChange}
  required
/>

// Replace description:
<BilingualInput
  label="Description"
  nameEn="description"
  nameAr="description_ar"
  valueEn={formData.description}
  valueAr={formData.description_ar}
  onChange={handleInputChange}
  type="textarea"
  required
/>

// Replace technical_description:
<BilingualInput
  label="Technical Description"
  nameEn="technical_description"
  nameAr="technical_description_ar"
  valueEn={formData.technical_description}
  valueAr={formData.technical_description_ar}
  onChange={handleInputChange}
  type="textarea"
/>

// Replace features array:
<BilingualArrayInput
  label="Features"
  valueEn={formData.features}
  valueAr={formData.features_ar}
  onChangeEn={(items) => setFormData(prev => ({ ...prev, features: items }))}
  onChangeAr={(items) => setFormData(prev => ({ ...prev, features_ar: items }))}
/>

// Similarly for: applications, instructions, storage, safety_precautions, safety_first_aid
```

---

### 2. FAQManager

**Category Form Updates:**

```tsx
// Add to category formData:
name_ar: '',
description_ar: '',

// Replace fields:
<BilingualInput
  label="Category Name"
  nameEn="name"
  nameAr="name_ar"
  valueEn={formData.name}
  valueAr={formData.name_ar}
  onChange={handleChange}
  required
/>

<BilingualInput
  label="Description"
  nameEn="description"
  nameAr="description_ar"
  valueEn={formData.description}
  valueAr={formData.description_ar}
  onChange={handleChange}
  type="textarea"
/>
```

**FAQ Item Form Updates:**

```tsx
// Add to FAQ item formData:
question_ar: '',
answer_ar: '',

// Replace fields:
<BilingualInput
  label="Question"
  nameEn="question"
  nameAr="question_ar"
  valueEn={formData.question}
  valueAr={formData.question_ar}
  onChange={handleChange}
  required
/>

<BilingualInput
  label="Answer"
  nameEn="answer"
  nameAr="answer_ar"
  valueEn={formData.answer}
  valueAr={formData.answer_ar}
  onChange={handleChange}
  type="textarea"
  required
/>
```

---

### 3. TroubleshootingManager

**Category Form Updates:**

```tsx
// Add to category formData:
name_ar: '',
description_ar: '',

// Use BilingualInput for name and description (same as FAQ categories)
```

**Troubleshooting Item Form Updates:**

```tsx
// Add to item formData:
problem_ar: '',
solution_ar: '',

// Replace fields:
<BilingualInput
  label="Problem"
  nameEn="problem"
  nameAr="problem_ar"
  valueEn={formData.problem}
  valueAr={formData.problem_ar}
  onChange={handleChange}
  required
/>

<BilingualInput
  label="Solution"
  nameEn="solution"
  nameAr="solution_ar"
  valueEn={formData.solution}
  valueAr={formData.solution_ar}
  onChange={handleChange}
  type="textarea"
  required
/>
```

---

### 4. BulletinsManager

**State Updates:**
```tsx
// Add to formData:
title_ar: '',
short_description_ar: '',
```

**Form Field Updates:**
```tsx
<BilingualInput
  label="Title"
  nameEn="title"
  nameAr="title_ar"
  valueEn={formData.title}
  valueAr={formData.title_ar}
  onChange={handleChange}
  required
/>

<BilingualInput
  label="Short Description"
  nameEn="short_description"
  nameAr="short_description_ar"
  valueEn={formData.short_description}
  valueAr={formData.short_description_ar}
  onChange={handleChange}
  type="textarea"
/>
```

**Note:** Content field is JSON with rich text - consider whether to make fully bilingual or keep separate bulletins for each language.

---

### 5. ContentManager (Pages)

**State Updates:**
```tsx
// Add to formData:
title_ar: '',
meta_description_ar: '',
```

**Form Field Updates:**
```tsx
<BilingualInput
  label="Page Title"
  nameEn="title"
  nameAr="title_ar"
  valueEn={formData.title}
  valueAr={formData.title_ar}
  onChange={handleChange}
  required
/>

<BilingualInput
  label="Meta Description"
  nameEn="meta_description"
  nameAr="meta_description_ar"
  valueEn={formData.meta_description}
  valueAr={formData.meta_description_ar}
  onChange={handleChange}
  type="textarea"
/>
```

---

## General Pattern for All Forms

### 1. Import Components
```tsx
import BilingualInput from './BilingualInput';
import BilingualArrayInput from './BilingualArrayInput';  // if needed
```

### 2. Update State
```tsx
// For each English field, add corresponding _ar field
const [formData, setFormData] = useState({
  // ... existing fields
  field_name_ar: '',  // or [] for arrays
});
```

### 3. Update useEffect/initialization
```tsx
// When loading existing data:
if (data) {
  setFormData({
    name: data.name,
    name_ar: data.name_ar || '',  // Important: handle null values
    // ... other fields
  });
}
```

### 4. Replace Input Fields
```tsx
// Replace regular inputs with BilingualInput
// Replace array inputs with BilingualArrayInput
```

### 5. Update Save/Submit Logic
```tsx
// No changes needed - just make sure to include _ar fields in the save data
const saveData = {
  ...formData,  // This will include all _ar fields
};
```

### 6. Update Display (View Mode)
```tsx
// When showing data in view mode:
<div>
  <label>Name</label>
  <p>{formData.name}</p>
  {formData.name_ar && <p dir="rtl">{formData.name_ar}</p>}
</div>
```

---

## Testing Checklist

After updating each form:

- [ ] Can create new item with English only
- [ ] Can create new item with both English and Arabic
- [ ] Can edit existing item and add Arabic content
- [ ] Can edit existing item with Arabic content
- [ ] Arabic text displays with RTL direction
- [ ] Frontend displays Arabic content when language is switched
- [ ] Frontend falls back to English when Arabic content is missing
- [ ] Form validation works correctly
- [ ] Save operation includes all Arabic fields

---

## Quick Implementation Priority

1. **High Priority** (User-facing content):
   - ProductsManager (most important for product display)
   - FAQManager (frequently viewed by users)
   - TroubleshootingManager (frequently viewed by users)

2. **Medium Priority**:
   - BulletinsManager
   - ContentManager (Pages)

3. **Low Priority**:
   - Other admin forms as needed
