export interface TroubleshootingItem {
  id: string;
  problem: string;
  solution: string;
  category: string;
  severity: 'Low' | 'Medium' | 'High';
}

export const carCoatingProblemsData: TroubleshootingItem[] = [
  {
    id: 'car-1',
    problem: 'Poor adhesion between coats',
    solution: 'Ensure proper surface preparation and cleaning. Check that the previous coat is properly cured before applying the next layer. Use appropriate adhesion promoter if necessary. Verify compatibility between coating systems.',
    category: 'Car Coating Problems',
    severity: 'High'
  },
  {
    id: 'car-2',
    problem: 'Orange peel texture on finish',
    solution: 'Reduce spray gun distance to 6-8 inches. Lower spray pressure and increase fluid flow. Ensure proper thinner ratio (10-15%). Apply in thinner, more even coats. Check environmental conditions - avoid high humidity.',
    category: 'Car Coating Problems',
    severity: 'Medium'
  },
  {
    id: 'car-3',
    problem: 'Color matching difficulties',
    solution: 'Use proper color mixing ratios and ensure thorough stirring. Check batch numbers for consistency. Apply test panel first. Consider lighting conditions during application and matching. Use spectrophotometer for accurate color matching.',
    category: 'Car Coating Problems',
    severity: 'Medium'
  },
  {
    id: 'car-4',
    problem: 'Fish eyes or crater formation',
    solution: 'Clean surface thoroughly with degreaser to remove silicone contamination. Use fish-eye eliminator additive in coating. Ensure spray booth is clean and free from contaminants. Replace contaminated spray equipment.',
    category: 'Car Coating Problems',
    severity: 'High'
  },
  {
    id: 'car-5',
    problem: 'Runs and sags in vertical surfaces',
    solution: 'Reduce coating viscosity and apply thinner coats. Maintain proper spray gun distance and speed. Avoid over-application in single pass. Check environmental temperature - cooler conditions slow drying.',
    category: 'Car Coating Problems',
    severity: 'Medium'
  },
  {
    id: 'car-6',
    problem: 'Dust contamination in finish',
    solution: 'Improve spray booth filtration system. Clean work area thoroughly before painting. Use tack cloth to remove dust from surface. Allow adequate flash time between coats. Check air quality in spray booth.',
    category: 'Car Coating Problems',
    severity: 'Low'
  },
  {
    id: 'car-7',
    problem: 'Uneven gloss levels',
    solution: 'Ensure uniform application thickness. Check spray pattern overlap (50%). Maintain consistent spray gun distance and speed. Verify coating is properly mixed. Check for contamination in coating material.',
    category: 'Car Coating Problems',
    severity: 'Medium'
  },
  {
    id: 'car-8',
    problem: 'Slow drying or curing',
    solution: 'Check environmental conditions - temperature should be 20-25°C, humidity below 70%. Ensure proper air circulation. Verify correct hardener ratio. Check expiration date of materials. Consider using faster hardener.',
    category: 'Car Coating Problems',
    severity: 'Medium'
  },
  {
    id: 'car-9',
    problem: 'Color bleeding or strike-through',
    solution: 'Apply proper sealer coat before color application. Use high hiding-power primer. Apply color in light, multiple coats rather than single heavy coat. Check compatibility between old and new coatings.',
    category: 'Car Coating Problems',
    severity: 'Medium'
  },
  {
    id: 'car-10',
    problem: 'Coating peeling or delamination',
    solution: 'Improve surface preparation - sand to proper profile. Remove all contamination including wax, grease, and old coating. Use appropriate primer system. Ensure proper cure time between coats.',
    category: 'Car Coating Problems',
    severity: 'High'
  },
  {
    id: 'car-11',
    problem: 'Brush marks or roller marks visible',
    solution: 'Use high-quality application tools. Add appropriate flow additive to coating. Apply in proper environmental conditions. Use cross-hatch application technique. Consider spray application for smoother finish.',
    category: 'Car Coating Problems',
    severity: 'Low'
  },
  {
    id: 'car-12',
    problem: 'Coating too thick or heavy build-up',
    solution: 'Apply multiple thin coats instead of single thick coat. Check viscosity and thin if necessary. Maintain proper spray gun settings. Allow adequate flash time between coats. Follow manufacturer DFT recommendations.',
    category: 'Car Coating Problems',
    severity: 'Medium'
  },
  {
    id: 'car-13',
    problem: 'Solvent popping or pin-holing',
    solution: 'Reduce coating thickness per coat. Lower spray pressure and increase distance. Ensure proper flash time between coats. Check environmental conditions - avoid high temperature application. Use slower evaporating thinner.',
    category: 'Car Coating Problems',
    severity: 'Medium'
  },
  {
    id: 'car-14',
    problem: 'Poor coverage or hiding power',
    solution: 'Apply additional coats as needed. Check pigment settling in coating - stir thoroughly. Use proper application technique with adequate overlap. Consider using high-opacity primer. Verify coating is not over-thinned.',
    category: 'Car Coating Problems',
    severity: 'Low'
  },
  {
    id: 'car-15',
    problem: 'Coating blushing or cloudy appearance',
    solution: 'Reduce humidity during application. Use slower evaporating thinner. Improve air circulation and temperature control. Apply thinner coats. Add anti-bloom additive if available.',
    category: 'Car Coating Problems',
    severity: 'Medium'
  },
  {
    id: 'car-16',
    problem: 'Excessive overspray',
    solution: 'Adjust spray gun fan pattern and pressure. Improve spray booth airflow. Use proper masking techniques. Maintain correct spray distance. Check gun maintenance and tip condition.',
    category: 'Car Coating Problems',
    severity: 'Low'
  },
  {
    id: 'car-17',
    problem: 'Coating chalking or fading',
    solution: 'Use UV-resistant coating formulation. Apply proper thickness as recommended. Ensure surface is properly primed. Avoid application in direct sunlight. Check coating storage conditions before use.',
    category: 'Car Coating Problems',
    severity: 'Medium'
  },
  {
    id: 'car-18',
    problem: 'Metallic settling or poor orientation',
    solution: 'Stir coating frequently during application. Use proper spray technique for metallic. Apply base coat in proper thickness. Maintain consistent spray pattern. Use recommended spray pressure for metallics.',
    category: 'Car Coating Problems',
    severity: 'Medium'
  },
  {
    id: 'car-19',
    problem: 'Coating cracking or checking',
    solution: 'Avoid applying coating too thick. Ensure proper cure time between coats. Check environmental conditions during application. Use proper primer system. Verify coating compatibility with substrate.',
    category: 'Car Coating Problems',
    severity: 'High'
  },
  {
    id: 'car-20',
    problem: 'Dry spray or rough texture',
    solution: 'Reduce spray distance to 6-8 inches. Increase fluid flow and reduce air pressure. Check environmental conditions - avoid windy or hot conditions. Use proper thinner type and ratio.',
    category: 'Car Coating Problems',
    severity: 'Medium'
  },
  {
    id: 'car-21',
    problem: 'Poor flow and leveling',
    solution: 'Add flow additive to coating. Check application temperature - should be 18-25°C. Use proper thinner ratio. Reduce application thickness. Improve spray technique and gun settings.',
    category: 'Car Coating Problems',
    severity: 'Medium'
  },
  {
    id: 'car-22',
    problem: 'Coating lifting or wrinkling',
    solution: 'Ensure compatibility between old and new coatings. Remove incompatible coating completely. Use appropriate primer or sealer. Allow proper cure time. Check solvent strength in new coating.',
    category: 'Car Coating Problems',
    severity: 'High'
  },
  {
    id: 'car-23',
    problem: 'Excessive gloss variation',
    solution: 'Maintain consistent application technique. Ensure uniform coating thickness. Check for contamination in coating. Use proper spray overlap pattern. Verify environmental conditions are stable.',
    category: 'Car Coating Problems',
    severity: 'Low'
  },
  {
    id: 'car-24',
    problem: 'Coating not curing properly',
    solution: 'Check hardener ratio - use correct mixing ratio. Verify hardener is not expired. Ensure proper environmental conditions for curing. Check for contamination in materials. Allow adequate cure time.',
    category: 'Car Coating Problems',
    severity: 'High'
  },
  {
    id: 'car-25',
    problem: 'Silvering or poor metallic appearance',
    solution: 'Apply base coat in proper wet thickness. Use correct spray technique for metallic application. Maintain consistent spray distance and speed. Apply clear coat promptly after base coat.',
    category: 'Car Coating Problems',
    severity: 'Medium'
  },
  {
    id: 'car-26',
    problem: 'Coating contamination during application',
    solution: 'Clean spray equipment thoroughly between colors. Use clean containers and mixing tools. Filter coating material before use. Maintain clean work environment. Replace contaminated material.',
    category: 'Car Coating Problems',
    severity: 'Medium'
  },
  {
    id: 'car-27',
    problem: 'Equipment malfunction during painting',
    solution: 'Perform regular maintenance on spray equipment. Check air pressure and fluid pressure settings. Clean gun tips and nozzles regularly. Ensure proper hose connections. Keep backup equipment available.',
    category: 'Car Coating Problems',
    severity: 'Low'
  },
  {
    id: 'car-28',
    problem: 'Color variation between panels',
    solution: 'Maintain consistent application technique across all panels. Ensure uniform coating thickness. Check lighting conditions during application. Apply wet-on-wet technique. Use proper spray overlap pattern.',
    category: 'Car Coating Problems',
    severity: 'Medium'
  }
];

export const coatingDefectsData: TroubleshootingItem[] = [
  {
    id: 'defect-1',
    problem: 'Blistering of coating surface',
    solution: 'Ensure surface is completely dry before coating application. Remove moisture sources and improve ventilation. Use proper primer system. Apply thinner coats and allow adequate drying time between applications. Check for substrate contamination.',
    category: 'Coating Application Defects',
    severity: 'High'
  },
  {
    id: 'defect-2',
    problem: 'Premature coating failure',
    solution: 'Verify surface preparation meets specifications. Use compatible primer and topcoat systems. Ensure proper application thickness. Check environmental conditions during application. Verify coating storage conditions were appropriate.',
    category: 'Coating Application Defects',
    severity: 'High'
  },
  {
    id: 'defect-3',
    problem: 'Uneven coating thickness',
    solution: 'Maintain consistent spray gun distance and speed. Use proper spray pattern overlap (50%). Check equipment calibration and settings. Apply in controlled environmental conditions. Use wet film thickness gauge during application.',
    category: 'Coating Application Defects',
    severity: 'Medium'
  },
  {
    id: 'defect-4',
    problem: 'Surface contamination during application',
    solution: 'Clean work area thoroughly before starting. Use filtered air supply for spray booth. Cover adjacent areas properly. Clean tools and equipment before use. Monitor air quality and filtration systems.',
    category: 'Coating Application Defects',
    severity: 'Medium'
  },
  {
    id: 'defect-5',
    problem: 'Pinhole formation in coating',
    solution: 'Apply coating in thinner layers. Reduce solvent content if over-thinned. Improve substrate surface profile. Ensure proper degassing of coating material. Use appropriate application technique and equipment.',
    category: 'Coating Application Defects',
    severity: 'Medium'
  },
  {
    id: 'defect-6',
    problem: 'Holiday or skip areas in coating',
    solution: 'Use systematic application pattern. Maintain proper spray overlap. Check spray equipment for consistent pattern. Use adequate lighting during application. Apply wet-on-wet technique where possible.',
    category: 'Coating Application Defects',
    severity: 'Medium'
  },
  {
    id: 'defect-7',
    problem: 'Coating discoloration or staining',
    solution: 'Use stain-blocking primer where needed. Prevent water infiltration into substrate. Apply proper film thickness. Use UV-resistant coating formulation. Address substrate bleeding or contamination sources.',
    category: 'Coating Application Defects',
    severity: 'Medium'
  },
  {
    id: 'defect-8',
    problem: 'Inter-coat adhesion failure',
    solution: 'Follow recommended recoat windows. Lightly sand between coats if outside recoat window. Ensure surface is clean and dust-free. Use compatible coating systems. Check for surface contamination.',
    category: 'Coating Application Defects',
    severity: 'High'
  },
  {
    id: 'defect-9',
    problem: 'Coating hardness problems',
    solution: 'Use correct hardener ratio for two-component systems. Ensure proper mixing and pot life adherence. Check curing temperature and humidity conditions. Allow full cure time before service. Verify material expiration dates.',
    category: 'Coating Application Defects',
    severity: 'High'
  },
  {
    id: 'defect-10',
    problem: 'Surface roughness or texture issues',
    solution: 'Improve surface preparation and smoothness. Use appropriate grade abrasives. Apply primer to fill surface imperfections. Check spray equipment for proper atomization. Control environmental conditions during application.',
    category: 'Coating Application Defects',
    severity: 'Medium'
  },
  {
    id: 'defect-11',
    problem: 'Coating brittleness or cracking',
    solution: 'Check coating formulation for proper flexibility. Avoid over-application of coating thickness. Ensure substrate movement is within coating tolerance. Use appropriate primer system. Check environmental stress factors.',
    category: 'Coating Application Defects',
    severity: 'High'
  },
  {
    id: 'defect-12',
    problem: 'Sagging or running on vertical surfaces',
    solution: 'Reduce coating viscosity and apply thinner layers. Adjust spray gun settings for vertical application. Maintain proper application technique and speed. Control environmental temperature during application.',
    category: 'Coating Application Defects',
    severity: 'Medium'
  },
  {
    id: 'defect-13',
    problem: 'Coating bubbling or foaming',
    solution: 'Reduce application speed and allow degassing time. Check for substrate outgassing. Use proper mixing technique to minimize air entrapment. Apply in appropriate environmental conditions. Check coating temperature before application.',
    category: 'Coating Application Defects',
    severity: 'Medium'
  }
];

export const troubleshootingCategories = [
  {
    id: 'car-coating',
    title: 'Car Coating Problem Guide',
    description: 'Comprehensive guide to common automotive coating problems and their solutions.',
    issueCount: 28,
    data: carCoatingProblemsData
  },
  {
    id: 'coating-defects',
    title: 'Defects which can appear when applying a coating',
    description: 'Common coating application defects and troubleshooting solutions.',
    issueCount: 13,
    data: coatingDefectsData
  }
];