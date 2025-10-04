# Quick Start: Bilingual Support

## For Users (Frontend)

### Switching Languages

1. Look for the **globe icon (🌐)** in the header
2. Click it to toggle between English and العربية (Arabic)
3. The entire site switches language and layout direction
4. Your preference is saved automatically

### What to Expect

- **English Mode**: Left-to-right layout, English text
- **Arabic Mode**: Right-to-left layout, Arabic text where available
- If Arabic content isn't available, English shows automatically

---

## For Admins (Dashboard)

### Adding Bilingual Content

When you create or edit any content (products, categories, FAQs, etc.), you'll see:

```
┌─────────────────────────────────┬─────────────────────────────────┐
│         English                 │      العربية (Arabic)           │
├─────────────────────────────────┼─────────────────────────────────┤
│  [English input field]          │  [Arabic input field - RTL]     │
└─────────────────────────────────┴─────────────────────────────────┘
```

### Best Practices

1. **Always fill in English** (required - serves as fallback)
2. **Fill in Arabic when possible** (optional but recommended)
3. Arabic fields automatically align right-to-left
4. You can add Arabic content later by editing existing items

### Example: Product Category

**English (Required):**
- Name: "Industrial Coatings"
- Description: "High-performance coatings for industrial applications"

**Arabic (Optional):**
- Name (AR): "الطلاءات الصناعية"
- Description (AR): "طلاءات عالية الأداء للتطبيقات الصناعية"

**Result:** Users see English or Arabic based on their language preference.

---

## Technical Quick Reference

### File Structure
```
src/
├── i18n/
│   ├── config.ts           # i18n setup
│   └── locales/
│       ├── en.json         # English UI translations
│       └── ar.json         # Arabic UI translations
├── components/
│   ├── LanguageSwitcher.tsx    # Language toggle button
│   └── admin/
│       ├── BilingualInput.tsx      # Text input component
│       └── BilingualArrayInput.tsx # Array input component
```

### Using Translation in Code

```tsx
import { useTranslation } from 'react-i18next';

function MyComponent() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  return (
    <div>
      <h1>{t('header.products')}</h1>
      {/* Display based on language */}
      <p>{isRTL && item.name_ar ? item.name_ar : item.name}</p>
    </div>
  );
}
```

### Database Fields

For any English field, there's a corresponding Arabic field:
- `name` → `name_ar`
- `description` → `description_ar`
- `features` (array) → `features_ar` (array)

---

## Testing Checklist

✅ Switch language using globe icon
✅ Page direction changes (LTR ↔ RTL)
✅ UI text translates correctly
✅ Content displays in selected language
✅ Fallback to English works when Arabic missing
✅ Admin forms show bilingual inputs
✅ Can save content in both languages
✅ Language preference persists on reload

---

## Support

- **Admin Guide**: See `BILINGUAL_ADMIN_GUIDE.md`
- **Implementation Details**: See `BILINGUAL_IMPLEMENTATION_SUMMARY.md`
- **Form Updates**: See `ADMIN_FORMS_UPDATE_CHECKLIST.md`
