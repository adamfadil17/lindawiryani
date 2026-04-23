// ─── HELPERS ──────────────────────────────────────────────────────────────────

import { WeddingTheme } from "@/types";
import { venueList } from "./venue-data";
import { weddingExperienceList } from "./wedding-experience-data";

const getVenue = (id: string) => venueList.find((v) => v.id === id)!;
const getExp = (id: string) => weddingExperienceList.find((e) => e.id === id)!;

// ─── THEME LIST ───────────────────────────────────────────────────────────────

export const weddingThemeList: WeddingTheme[] = [
  // ─── ELOPEMENT THEMES ─────────────────────────────────────────────────────

  {
    id: "private-villa-elopement",
    slug: "private-villa-elopement",
    type: "ELOPEMENT",
    title: "Private Villa Elopements",
    description: `<p>Private Villa Elopements are designed for couples who value privacy, calm, and a deeply personal setting. Set within carefully curated private villas, these celebrations are guided by architecture, landscape, and the natural flow of the space — creating an atmosphere that feels intimate, unhurried, and intentionally refined.</p>

<p>Linda Wiryani Design and Event Planning works with a selection of stunning private villas ideal for intimate elopements. Couples may also choose to celebrate at a villa they have independently booked, subject to suitability and venue guidelines.</p>

<blockquote><p>This ceremony is not designed to impress through excess, but to resonate through clarity, balance, and intention. A quiet exchange of vows. A beautifully considered setting. And a moment that feels deeply personal and timeless.</p></blockquote>

<h3>What's Included</h3>

<h4>Ceremony Design &amp; Coordination</h4>
<ul>
  <li>Wedding ceremony planning and on-the-day coordination by Linda Wiryani Design &amp; Event Planning (1 pax)</li>
  <li>English-speaking local celebrant</li>
  <li>Custom-designed commemorative wedding certificate as a keepsake</li>
</ul>

<h4>Floral Styling <em>(Local Flowers | Refined &amp; Elegant)</em></h4>
<ul>
  <li>Ceremony backdrop styled using a harmonious blend of locally sourced fresh flowers, natural greenery, and select artificial elements, thoughtfully composed to complement the private villa surroundings</li>
  <li>Flower petals along the ceremony walkway</li>
  <li>Floral aisle arrangements designed to feel natural and restrained</li>
  <li>Bridal bouquet using local flowers</li>
  <li>Groom's boutonniere, coordinated with the floral palette</li>
</ul>

<h4>Music</h4>
<ul>
  <li>Solo guitarist or solo violinist providing understated, atmospheric ceremony music</li>
</ul>

<h4>Photography</h4>
<ul>
  <li>Professional photographer for 2 hours (1 pax)</li>
  <li>Carefully curated and edited best-selected images</li>
  <li>Final images delivered within 1 week via private Google Drive link</li>
</ul>

<h3>Ceremony Timing</h3>
<p>Private Villa Elopements are most beautifully experienced during two natural light windows, when the atmosphere within the villa feels most serene and balanced.</p>
<ul>
  <li><strong>Morning (Approximately 7:00 – 9:00 AM)</strong> — Soft, diffused light and a tranquil atmosphere before the day fully unfolds. The air is typically cooler, the environment quieter, and natural light gently enhances architectural lines and surrounding landscapes.</li>
  <li><strong>Sunset (Approximately 5:00 – 6:30 PM)</strong> — A warm, golden ambiance as light moves through the villa's architecture and surrounding greenery. The gradual transition from daylight to evening adds depth and romance, offering a refined and atmospheric setting.</li>
</ul>

<h3>Important Notes</h3>
<ul>
  <li>This package is intentionally curated to remain simple, elegant, and focused on the ceremony moment itself</li>
  <li>Only items listed above are included</li>
  <li>Ceremony timing will be confirmed once the private villa is selected, taking into consideration natural light, atmosphere, and the villa's layout</li>
  <li>Villa accommodation rates are not included and will be added upon request</li>
  <li>Package rates start from <strong>IDR 25,000,000</strong></li>
</ul>

<h3>Not Included</h3>
<p>The following can be arranged separately upon request: venue or event fees, accommodation or villa stay, transportation, sound system or audio equipment, videography or drone, additional musicians or live entertainment, hair and makeup, wedding gown, suits, or accessories, rehearsals involving all vendors.</p>`,
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/v1776939440/Private_Villa_1_Villa_Vivara_rqlfen.webp",
    gallery: [
      {
        id: "private-villa-elopement-img-1",
        url: "https://res.cloudinary.com/dzerxindp/image/upload/v1776939440/Private_Villa_1_Villa_Vivara_rqlfen.webp",
        sort_order: 0,
        theme_id: "private-villa-elopement",
      },
      {
        id: "private-villa-elopement-img-2",
        url: "https://res.cloudinary.com/dzerxindp/image/upload/v1776939441/Private_Villa_2_nzpo7m.png",
        sort_order: 1,
        theme_id: "private-villa-elopement",
      },
      {
        id: "private-villa-elopement-img-2",
        url: "https://res.cloudinary.com/dzerxindp/image/upload/v1776940317/Private_Villa_Elopement_Mutiara_6_etnh26.png",
        sort_order: 2,
        theme_id: "private-villa-elopement",
      },
      {
        id: "private-villa-elopement-img-2",
        url: "https://res.cloudinary.com/dzerxindp/image/upload/v1776940317/Private_Villa_Elopement_Vivara1_wqecfn.png",
        sort_order: 3,
        theme_id: "private-villa-elopement",
      },
    ],
    venue_id: "",
    venue: getVenue(""),
    experience_id: "3",
    experience: getExp("3"),
  },

  {
    id: "cliffside-elopement",
    slug: "cliffside-elopement",
    type: "ELOPEMENT",
    title: "Cliffside Elopements",
    description: `<p>Cliffside Elopements are designed for couples drawn to open horizons, dramatic elevation, and the quiet power of the sea. Set along Bali's coastal cliffs, these celebrations are shaped by light, wind, and expansive views — creating an atmosphere that feels intimate yet awe-inspiring.</p>

<p>Linda Wiryani Design and Event Planning works with a curated selection of stunning cliffside venues and private estates suited for intimate elopements. Venue selection is guided by accessibility, safety, and overall design harmony.</p>

<blockquote><p>This ceremony is not designed to impress through excess, but to resonate through clarity, balance, and intention. A quiet exchange of vows. A horizon without end. And a moment that feels both intimate and expansive.</p></blockquote>

<h3>What's Included</h3>

<h4>Ceremony Design &amp; Coordination</h4>
<ul>
  <li>Wedding ceremony planning and on-the-day coordination by Linda Wiryani Design &amp; Event Planning (1 pax)</li>
  <li>English-speaking local celebrant</li>
  <li>Custom-designed commemorative wedding certificate as a keepsake</li>
  <li>Venue access fees included</li>
</ul>

<h4>Floral Styling <em>(Local Flowers | Refined &amp; Elegant)</em></h4>
<ul>
  <li>Ceremony backdrop styled using a harmonious blend of locally sourced fresh flowers, natural greenery, and select artificial elements, thoughtfully composed to complement the cliffside surroundings</li>
  <li>Flower petals along the ceremony walkway</li>
  <li>Floral aisle arrangements designed to feel natural yet structured against the coastal landscape</li>
  <li>Bridal bouquet using local flowers</li>
  <li>Groom's boutonniere coordinated with the overall floral palette</li>
</ul>

<h4>Music</h4>
<ul>
  <li>Solo guitarist or solo violinist providing understated, atmospheric ceremony music</li>
</ul>

<h4>Photography</h4>
<ul>
  <li>Professional photographer for 2 hours (1 pax)</li>
  <li>Carefully curated and edited best-selected images</li>
  <li>Final images delivered within 1 week via private Google Drive link</li>
</ul>

<h3>Ceremony Timing</h3>
<p>Cliffside Elopements are most beautifully experienced during two natural light windows:</p>
<ul>
  <li><strong>Morning (Approximately 7:00 – 9:00 AM)</strong> — Softer wind conditions, clearer skies, and gentle natural light. The atmosphere feels calm, intimate, and serene, with fewer visitors and a quieter coastal environment.</li>
  <li><strong>Sunset (Approximately 5:00 – 6:30 PM)</strong> — Dramatic golden light, expansive horizon tones, and a naturally cinematic atmosphere. The sky gradually shifts in color, creating a powerful and emotive backdrop against the ocean and cliffs.</li>
</ul>

<h3>Important Notes</h3>
<ul>
  <li>This package is intentionally curated to remain simple, elegant, and focused on the ceremony moment itself</li>
  <li>Only items listed above are included</li>
  <li>Ceremony timing will be confirmed once the venue is selected, taking into consideration natural light, tide conditions, and overall atmosphere</li>
  <li>Package rates start from <strong>IDR 25,000,000</strong></li>
</ul>

<h3>Not Included</h3>
<p>The following can be arranged separately upon request: additional venue or event fees, accommodation or stay, transportation, sound system or audio equipment, videography or drone, additional musicians or live entertainment, hair and makeup, wedding gown, suits, or accessories, rehearsals involving all vendors.</p>`,
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/v1776939445/Cliffside_Elopement_1_vof9yx.png",
    gallery: [
      {
        id: "cliffside-elopement-img-1",
        url: "https://res.cloudinary.com/dzerxindp/image/upload/v1776939445/Cliffside_Elopement_1_vof9yx.png",
        sort_order: 0,
        theme_id: "cliffside-elopement",
      },
      {
        id: "cliffside-elopement-img-2",
        url: "https://res.cloudinary.com/dzerxindp/image/upload/v1776939442/Cliffside_Elopement_2_naudou.png",
        sort_order: 1,
        theme_id: "cliffside-elopement",
      },
    ],
    venue_id: "",
    venue: getVenue(""),
    experience_id: "3",
    experience: getExp("3"),
  },

  {
    id: "architectural-modern-tropical-elopement",
    slug: "architectural-modern-tropical-elopement",
    type: "ELOPEMENT",
    title: "Architectural & Modern Tropical Elopements",
    description: `<p>Architectural and Modern Tropical Elopements are designed for couples drawn to clean lines, natural materials, and spaces with strong visual character. Set within thoughtfully designed venues — from modern tropical villas to architect-led estates — these celebrations are guided by proportion, light, texture, and spatial flow.</p>

<p>Linda Wiryani Design and Event Planning works with a curated selection of design-forward venues where structure, materiality, and landscape exist in quiet harmony. Venue selection is guided by architectural integrity, privacy, and aesthetic coherence.</p>

<blockquote><p>This ceremony is not designed to impress through excess, but to resonate through structure, restraint, and intention. Clean lines. Natural textures. And a moment framed by thoughtful design.</p></blockquote>

<h3>What's Included</h3>

<h4>Ceremony Design &amp; Coordination</h4>
<ul>
  <li>Wedding ceremony planning and on-the-day coordination by Linda Wiryani Design &amp; Event Planning (1 pax)</li>
  <li>English-speaking local celebrant</li>
  <li>Custom-designed commemorative wedding certificate as a keepsake</li>
</ul>

<h4>Floral Styling <em>(Local Flowers | Refined &amp; Elegant)</em></h4>
<ul>
  <li>Ceremony backdrop styled using a harmonious blend of locally sourced fresh flowers, natural greenery, and select artificial elements, thoughtfully composed to complement the architectural and modern tropical surroundings</li>
  <li>Flower petals along the ceremony walkway</li>
  <li>Floral aisle arrangements designed to complement the venue's structural lines and natural materials</li>
  <li>Bridal bouquet using local flowers</li>
  <li>Groom's boutonniere coordinated with the overall floral palette</li>
</ul>

<h4>Music</h4>
<ul>
  <li>Solo guitarist or solo violinist providing understated, atmospheric ceremony music</li>
</ul>

<h4>Photography</h4>
<ul>
  <li>Professional photographer for 2 hours (1 pax)</li>
  <li>Carefully curated and edited best-selected images</li>
  <li>Final images delivered within 1 week via private Google Drive link</li>
</ul>

<h3>Ceremony Timing</h3>
<p>Architectural &amp; Modern Tropical Elopements are most beautifully experienced during:</p>
<ul>
  <li><strong>Morning (Approximately 7:00 – 9:00 AM)</strong> — Soft light enhances architectural lines and material textures. The atmosphere feels calm, airy, and spatially balanced.</li>
  <li><strong>Sunset (Approximately 5:00 – 6:30 PM)</strong> — Golden light interacts with structural forms, creating depth, shadow play, and a refined cinematic ambiance.</li>
</ul>
<p>Final timing will be guided by the building's orientation, light movement, and spatial composition to ensure visual harmony.</p>

<h3>Important Notes</h3>
<ul>
  <li>This package is intentionally curated to remain simple, elegant, and focused on the ceremony moment itself</li>
  <li>Only items listed above are included</li>
  <li>Ceremony timing will be confirmed once the venue is selected, taking into consideration natural light, architectural shadows, and overall spatial composition</li>
  <li>Package rates start from <strong>IDR 25,000,000</strong></li>
</ul>

<h3>Not Included</h3>
<p>The following can be arranged separately upon request: venue or event fees, accommodation or stay, transportation, sound system or additional audio equipment, videography or drone, additional musicians or live entertainment, hair and makeup, wedding gown, suits, or accessories, rehearsals involving all vendors.</p>`,
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/v1776939440/Architectural_Modern_Tropical_Elopements_nlnd5r.jpg",
    gallery: [
      {
        id: "architectural-modern-tropical-elopement-img-1",
        url: "https://res.cloudinary.com/dzerxindp/image/upload/v1776939440/Architectural_Modern_Tropical_Elopements_nlnd5r.jpg",
        sort_order: 0,
        theme_id: "architectural-modern-tropical-elopement",
      },
    ],
    venue_id: "",
    venue: getVenue(""),
    experience_id: "3",
    experience: getExp("3"),
  },

  {
    id: "forest-jungle-elopement",
    slug: "forest-jungle-elopement",
    type: "ELOPEMENT",
    title: "Forest & Jungle Elopements",
    description: `<p>Forest &amp; Jungle Elopements are designed for couples drawn to lush greenery, filtered light, and a deep sense of immersion in nature. Set within tropical forests and jungle landscapes, these celebrations are guided by the rhythm of the land, layered foliage, natural textures, and moments of quiet stillness.</p>

<p>Here, nature is not styled over or reshaped. It sets the tone, pace, and emotional atmosphere of the ceremony.</p>

<p>Linda Wiryani Design and Event Planning works with a curated selection of forest sanctuaries, jungle clearings, and nature-integrated venues where landscape, light, and design exist in natural balance. Venue selection is guided by accessibility, environmental sensitivity, and harmony with the surroundings.</p>

<blockquote><p>This ceremony is not designed to impress through excess, but to resonate through presence, restraint, and connection to nature. Filtered light. Living textures. And a moment held quietly within the forest.</p></blockquote>

<h3>What's Included</h3>

<h4>Ceremony Design &amp; Coordination</h4>
<ul>
  <li>Wedding ceremony planning and on-the-day coordination by Linda Wiryani Design &amp; Event Planning (1 pax)</li>
  <li>English-speaking local celebrant</li>
  <li>Custom-designed commemorative wedding certificate as a keepsake</li>
  <li>Venue access fees included</li>
</ul>

<h4>Floral Styling <em>(Local Flowers | Refined &amp; Natural)</em></h4>
<ul>
  <li>Ceremony backdrop styled using a harmonious blend of locally sourced fresh flowers, natural greenery, and select artificial elements, thoughtfully composed to complement the forest or jungle surroundings</li>
  <li>Flower petals along the ceremony walkway</li>
  <li>Floral aisle arrangements guided by organic form and natural movement</li>
  <li>Bridal bouquet using local flowers</li>
  <li>Groom's boutonniere coordinated with the overall floral palette</li>
</ul>

<h4>Music</h4>
<ul>
  <li>Solo guitarist or solo violinist providing understated, atmospheric ceremony music</li>
</ul>

<h4>Photography</h4>
<ul>
  <li>Professional photographer for 2 hours (1 pax)</li>
  <li>Carefully curated and edited best-selected images</li>
  <li>Final images delivered within 1 week via private Google Drive link</li>
</ul>

<h3>Perfect Timing</h3>
<p>Forest &amp; Jungle Elopements are most beautifully experienced during natural light windows that complement the canopy environment.</p>
<ul>
  <li><strong>Morning (Approximately 7:00 – 9:00 AM)</strong> — Morning offers softer humidity, gentler light filtering through the trees, and a quieter atmosphere before public activity increases. This timing feels serene, fresh, and grounded.</li>
  <li><strong>Late Afternoon (Approximately 4:30 – 6:00 PM)</strong> — Late afternoon provides warmer tones and deeper shadows within the forest layers. The light becomes more atmospheric, creating depth and subtle drama beneath the canopy.</li>
</ul>
<p>Exact timing will be confirmed based on light penetration through the tree canopy, seasonal weather patterns, accessibility and venue regulations, and overall safety and comfort. Morning ceremonies generally provide more stable weather conditions and softer environmental dynamics.</p>

<h3>Important Notes</h3>
<ul>
  <li>This package is intentionally curated to remain simple, elegant, and focused on the ceremony moment itself</li>
  <li>Only items listed above are included</li>
  <li>This package is designed for a couple only</li>
  <li>Ceremony timing will be confirmed once the venue is selected, taking into consideration natural light, forest canopy, and overall environmental conditions</li>
  <li>Package rates start from <strong>IDR 25,000,000</strong></li>
</ul>

<h3>Weather &amp; Nature Conditions</h3>
<p>Jungle environments are naturally dynamic and influenced by tropical climate patterns. Conditions may include sudden rainfall or passing showers, high humidity, uneven or natural terrain, insects and forest wildlife, and shifting light beneath tree canopy.</p>
<p>As these ceremonies take place in natural outdoor settings, weather conditions are beyond our control. In the event of rain, there is no guaranteed fixed indoor backup venue unless specifically provided by the selected location. The ceremony may pause briefly to allow weather conditions to settle, or where possible, be repositioned within a naturally sheltered area of the venue. Floral elements and décor may be adjusted or simplified to ensure safety and structural stability.</p>
<p>The couple acknowledges that tropical forest conditions are inherent to this setting and are not grounds for cancellation, refund, or rescheduling unless otherwise agreed in writing. Safety and environmental respect remain the highest priority at all times.</p>

<h3>Payment &amp; Booking Conditions</h3>
<ul>
  <li>A 50% non-refundable deposit is required upon confirmation of booking</li>
  <li>The remaining 50% balance must be paid no later than 30 days prior to the event date</li>
  <li>The event date is not considered secured until the deposit has been received</li>
  <li>All payments made are non-refundable unless otherwise stated in writing</li>
  <li>Failure to complete the final balance payment by the agreed deadline may result in cancellation of services without refund of the initial deposit</li>
  <li>Any requested changes to the venue, ceremony date, or key design elements after confirmation are subject to availability and may incur additional fees depending on logistical or vendor adjustments</li>
  <li>Venue access fees and any location-specific permits follow the respective venue's own policies where applicable</li>
</ul>

<h3>Not Included</h3>
<p>The following can be arranged separately upon request: venue or event fees (if applicable), accommodation or stay, transportation, sound system or additional audio equipment, videography or drone, additional musicians or live entertainment, hair and makeup, wedding gown, suits, or accessories, rehearsals involving all vendors, and any items not explicitly listed under What's Included.</p>`,
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/v1776939441/Forest_Jungle_Elopements_wgemwg.png",
    gallery: [
      {
        id: "forest-jungle-elopement-img-1",
        url: "https://res.cloudinary.com/dzerxindp/image/upload/v1776939441/Forest_Jungle_Elopements_wgemwg.png",
        sort_order: 0,
        theme_id: "forest-jungle-elopement",
      },
    ],
    venue_id: "",
    venue: getVenue(""),
    experience_id: "3",
    experience: getExp("3"),
  },

  {
    id: "waterfall-elopement",
    slug: "waterfall-elopement",
    type: "ELOPEMENT",
    title: "Waterfall Elopements",
    description: `<p>Waterfall Elopements are designed for couples drawn to raw movement, natural sound, and the grounding presence of flowing water. Set before cascading falls and surrounded by lush greenery, these celebrations are shaped by mist, light, and the elemental rhythm of nature.</p>

<p>Here, water is not merely a scenic feature. It becomes part of the ceremony's atmosphere, guiding its pace, tone, and emotional depth.</p>

<p>Linda Wiryani Design and Event Planning works with a curated selection of waterfall sanctuaries and nature-integrated locations, where landscape, accessibility, and environmental respect are carefully considered. Venue selection prioritizes safety, privacy, and harmony with the surroundings.</p>

<blockquote><p>This ceremony is not designed to impress through excess, but to resonate through movement, grounding, and elemental presence. Falling water. Soft mist. And a moment carried gently by nature itself.</p></blockquote>

<h3>What's Included</h3>

<h4>Ceremony Design &amp; Coordination</h4>
<ul>
  <li>Wedding ceremony planning and on-the-day coordination by Linda Wiryani Design &amp; Event Planning (1 pax)</li>
  <li>English-speaking local celebrant</li>
  <li>Custom-designed commemorative wedding certificate as a keepsake</li>
  <li>Venue access fees included</li>
</ul>

<h4>Floral Styling <em>(Local Flowers | Refined &amp; Natural)</em></h4>
<ul>
  <li>Ceremony backdrop styled using a harmonious blend of locally sourced fresh flowers, natural greenery, and select artificial elements, thoughtfully composed to complement the waterfall surroundings</li>
  <li>Flower petals along the ceremony walkway</li>
  <li>Floral aisle arrangements guided by organic form and environmental sensitivity</li>
  <li>Bridal bouquet using local flowers</li>
  <li>Groom's boutonniere coordinated with the overall floral palette</li>
</ul>

<h4>Music</h4>
<ul>
  <li>Solo guitarist or solo violinist providing understated, atmospheric ceremony music <em>(Note: live music volume may be adjusted in response to the natural sound of the waterfall.)</em></li>
</ul>

<h4>Photography</h4>
<ul>
  <li>Professional photographer for 2 hours (1 pax)</li>
  <li>Carefully curated and edited best-selected images</li>
  <li>Final images delivered within 1 week via private Google Drive link</li>
</ul>

<h3>Perfect Timing</h3>
<p>Waterfall Elopements are most beautifully experienced during times when natural light and visitor activity are most favorable.</p>
<ul>
  <li><strong>Early Morning (Approximately 6:00 – 8:00 AM)</strong> — Morning ceremonies offer softer light, reduced visitor presence, calmer atmosphere, and more stable water conditions. The environment feels fresh, intimate, and serene.</li>
  <li><strong>Late Afternoon (Approximately 4:30 – 5:30 PM)</strong> — Late afternoon may provide warmer tones and softer shadows; however, visitor traffic and humidity levels may vary depending on the location.</li>
</ul>
<p>Morning timing is generally recommended for greater privacy, safer terrain conditions, more consistent lighting, and reduced public activity. Final timing will be confirmed based on seasonal weather patterns, accessibility, and overall safety considerations.</p>

<h3>Important Notes</h3>
<ul>
  <li>This package is intentionally curated to remain simple, elegant, and focused on the ceremony moment itself</li>
  <li>Only items listed above are included</li>
  <li>This package is designed for a couple only</li>
  <li>Ceremony timing will be confirmed once the location is selected, taking into consideration natural light, water flow, and environmental conditions</li>
  <li>Package rates start from <strong>IDR 25,000,000</strong></li>
</ul>

<h3>Weather &amp; Nature Conditions</h3>
<p>Waterfall environments are naturally dynamic and influenced by seasonal rainfall, water flow levels, terrain conditions, and tropical weather patterns. Conditions may include sudden rain or passing showers, increased water volume after rainfall, slippery or uneven natural terrain, humidity and mist, natural ambient sound from flowing water, and limited accessibility depending on the location.</p>
<p>As these ceremonies take place within active natural environments, conditions are beyond our control. In the event of rain or strong water flow, the ceremony may pause temporarily to allow conditions to stabilize. If water levels or terrain are deemed unsafe, the ceremony may be repositioned to a safer nearby area within the venue where possible. Floral installations and décor may be adjusted, simplified, or secured to ensure structural safety. Safety decisions made by the Planner or venue management are final.</p>
<p>This package does not include a guaranteed indoor backup venue unless specifically stated. The couple acknowledges that waterfall conditions are inherent to the setting and are not grounds for cancellation, refund, or rescheduling unless otherwise agreed in writing. Safety and environmental respect remain the highest priority.</p>

<h3>Payment &amp; Booking Conditions</h3>
<ul>
  <li>A 50% non-refundable deposit is required upon confirmation of booking</li>
  <li>The remaining 50% balance must be paid no later than 30 days prior to the event date</li>
  <li>The event date is not secured until the deposit has been received</li>
  <li>All payments made are non-refundable unless otherwise agreed in writing</li>
  <li>Failure to complete the final balance payment by the agreed deadline may result in cancellation of services without refund of the deposit</li>
  <li>Any requested changes to the ceremony date, location, or key elements after confirmation are subject to availability and may incur additional fees depending on vendor rescheduling or permit adjustments</li>
  <li>Venue permits and entrance fees (if applicable) follow the specific waterfall location's own policies</li>
</ul>

<h3>Not Included</h3>
<p>The following can be arranged separately upon request: venue or event fees (if applicable), accommodation or stay, transportation, sound system or additional audio equipment, videography or drone, additional musicians or live entertainment, hair and makeup, wedding gown, suits, or accessories, rehearsals involving all vendors, and any items not explicitly listed under What's Included.</p>`,
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/v1776939441/Waterfall_Wedding_1_kk2634.png",
    gallery: [
      {
        id: "waterfall-elopement-img-1",
        url: "https://res.cloudinary.com/dzerxindp/image/upload/v1776939441/Waterfall_Wedding_1_kk2634.png",
        sort_order: 0,
        theme_id: "waterfall-elopement",
      },
    ],
    venue_id: "",
    venue: getVenue(""),
    experience_id: "3",
    experience: getExp("3"),
  },

  {
    id: "rice-field-elopement",
    slug: "rice-field-elopement",
    type: "ELOPEMENT",
    title: "Rice Field Elopements",
    description: `<p>Rice Field Elopements are designed for couples drawn to open horizons, soft breezes, and the quiet poetry of rural landscapes. Set amidst Bali's lush rice terraces and agrarian fields, these celebrations unfold within wide skies, gentle light, and the rhythmic calm of nature.</p>

<p>Here, the landscape is not merely scenic. It shapes the ceremony's atmosphere, offering stillness, openness, and a sense of grounded simplicity.</p>

<p>Linda Wiryani Design and Event Planning works with a curated selection of rice field venues and countryside settings, where accessibility, privacy, and harmony with local surroundings are thoughtfully considered. Venue selection respects both the natural terrain and the surrounding community.</p>

<blockquote><p>This ceremony is not designed to impress through excess, but to resonate through openness, balance, and quiet connection. Open sky. Gentle light. And a moment held softly within the fields.</p></blockquote>

<h3>What's Included</h3>

<h4>Ceremony Design &amp; Coordination</h4>
<ul>
  <li>Wedding ceremony planning and on-the-day coordination by Linda Wiryani Design &amp; Event Planning (1 pax)</li>
  <li>English-speaking local celebrant</li>
  <li>Custom-designed commemorative wedding certificate as a keepsake</li>
  <li>Venue access fees included</li>
</ul>

<h4>Floral Styling <em>(Local Flowers | Refined &amp; Natural)</em></h4>
<ul>
  <li>Ceremony backdrop styled using a harmonious blend of locally sourced fresh flowers, natural greenery, and select artificial elements, thoughtfully composed to complement the rice field landscape</li>
  <li>Flower petals along the ceremony walkway</li>
  <li>Floral aisle arrangements guided by organic form and natural simplicity</li>
  <li>Bridal bouquet using local flowers</li>
  <li>Groom's boutonniere coordinated with the overall floral palette</li>
</ul>

<h4>Music</h4>
<ul>
  <li>Solo guitarist or solo violinist providing understated, atmospheric ceremony music</li>
</ul>

<h4>Photography</h4>
<ul>
  <li>Professional photographer for 2 hours (1 pax)</li>
  <li>Carefully curated and edited best-selected images</li>
  <li>Final images delivered within 1 week via private Google Drive link</li>
</ul>

<h3>Perfect Timing</h3>
<p>Rice Field Elopements are most beautifully experienced during times when light is soft and temperatures are comfortable.</p>
<ul>
  <li><strong>Early Morning (Approximately 6:00 – 8:00 AM)</strong> — Morning offers cooler air, softer natural light, and a quieter rural atmosphere before farming activities increase. The light feels fresh and gentle across the terraces.</li>
  <li><strong>Late Afternoon / Sunset (Approximately 5:00 – 6:30 PM)</strong> — Sunset ceremonies provide warm golden tones across the fields, creating depth and glow within the landscape. The atmosphere feels expansive and romantic.</li>
</ul>
<p>Morning timing is generally recommended for cooler temperatures, more stable weather conditions, greater privacy, and softer lighting. Final timing will be confirmed based on seasonal light patterns, agricultural cycles, and overall environmental comfort.</p>

<h3>Important Notes</h3>
<ul>
  <li>This package is intentionally curated to remain simple, elegant, and focused on the ceremony moment itself</li>
  <li>Only items listed above are included</li>
  <li>This package is designed for a couple only</li>
  <li>Ceremony timing will be confirmed once the location is selected, taking into consideration natural light, field conditions, and overall atmosphere</li>
  <li>Package rates start from <strong>IDR 25,000,000</strong></li>
</ul>

<h3>Weather &amp; Nature Conditions</h3>
<p>Rice field environments are naturally open and fully exposed to tropical climate conditions. Factors may include direct sunlight and heat exposure, wind across open fields, sudden tropical rain, seasonal mud or soft ground conditions, insects common to rural landscapes, and agricultural activity depending on planting cycles.</p>
<p>As these ceremonies take place in active rural settings, weather and field conditions are beyond our control. In the event of rain or strong wind, the ceremony may pause temporarily to allow conditions to settle, or if available, be repositioned to a nearby sheltered area. Floral elements and décor installations may be adjusted, secured, or simplified to ensure safety and visual harmony. Terrain conditions may limit certain styling elements for safety reasons.</p>
<p>The couple acknowledges that rice field settings are living agricultural landscapes and that environmental factors are inherent to the location. Weather conditions are not grounds for cancellation, refund, or rescheduling unless otherwise agreed in writing. Safety, respect for local farming activity, and environmental harmony remain priorities at all times.</p>

<h3>Payment &amp; Booking Conditions</h3>
<ul>
  <li>A 50% non-refundable deposit is required upon confirmation of booking</li>
  <li>The remaining 50% balance must be paid no later than 30 days prior to the event date</li>
  <li>The event date is not considered secured until the deposit has been received</li>
  <li>All payments made are non-refundable unless otherwise agreed in writing</li>
  <li>Failure to complete the final balance payment by the agreed deadline may result in cancellation of services without refund of the deposit</li>
  <li>Any requested changes to venue, ceremony timing, or key elements after confirmation are subject to availability and may incur additional fees depending on logistical or vendor adjustments</li>
  <li>Venue access fees and community permissions (where applicable) follow local policies and may vary depending on the specific rice field location</li>
</ul>

<h3>Not Included</h3>
<p>The following can be arranged separately upon request: venue or event fees (if applicable), accommodation or stay, transportation, sound system or additional audio equipment, videography or drone, additional musicians or live entertainment, hair and makeup, wedding gown, suits, or accessories, rehearsals involving all vendors, and any items not explicitly listed under What's Included.</p>`,
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/v1776939441/Rice_Field_Elopements_z7rkqm.jpg",
    gallery: [
      {
        id: "rice-field-elopement-img-1",
        url: "https://res.cloudinary.com/dzerxindp/image/upload/v1776939441/Rice_Field_Elopements_z7rkqm.jpg",
        sort_order: 0,
        theme_id: "rice-field-elopement",
      },
    ],
    venue_id: "",
    venue: getVenue(""),
    experience_id: "3",
    experience: getExp("3"),
  },

  {
    id: "beachfront-elopement",
    slug: "beachfront-elopement",
    type: "ELOPEMENT",
    title: "Beachfront Elopements",
    description: `<p>Beachfront Elopements are designed for couples drawn to horizon lines, ocean breeze, and the elemental rhythm of the sea. Set along Bali's coastline where waves meet open sky, these ceremonies unfold within salt-kissed air, shifting light, and the grounding presence of water.</p>

<p>Here, the ocean is not merely scenic. It shapes the ceremony's atmosphere, offering movement, clarity, and a sense of expansive calm.</p>

<p>Linda Wiryani Design and Event Planning works with a curated selection of beachfront venues and coastal settings, where privacy, accessibility, tidal conditions, and environmental respect are thoughtfully considered. Venue selection honors both the natural shoreline and local regulations.</p>

<blockquote><p>This ceremony is not designed to impress through excess, but to resonate through openness, balance, and quiet connection. Endless horizon. Salt air. And a vow carried gently by the sea.</p></blockquote>

<h3>What's Included</h3>

<h4>Ceremony Design &amp; Coordination</h4>
<ul>
  <li>Wedding ceremony planning and on-the-day coordination by Linda Wiryani Design &amp; Event Planning (1 pax)</li>
  <li>English-speaking local celebrant</li>
  <li>Custom-designed commemorative wedding certificate as a keepsake</li>
  <li>Venue access fees included (where applicable within agreed beachfront location)</li>
</ul>

<h4>Floral Styling <em>(Local Flowers | Refined &amp; Coastal-Inspired)</em></h4>
<ul>
  <li>Ceremony backdrop styled using a harmonious blend of locally sourced fresh flowers, natural greenery, and select artificial elements, thoughtfully composed to complement the ocean setting</li>
  <li>Flower petals along the ceremony walkway</li>
  <li>Floral aisle arrangements guided by organic flow and coastal simplicity</li>
  <li>Bridal bouquet using locally sourced flowers</li>
  <li>Groom's boutonniere coordinated with the overall floral palette</li>
</ul>

<h4>Music</h4>
<ul>
  <li>Solo guitarist or solo violinist providing understated, atmospheric ceremony music</li>
</ul>

<h4>Photography</h4>
<ul>
  <li>Professional photographer for 2 hours (1 pax)</li>
  <li>Carefully curated and edited best-selected images</li>
  <li>Final images delivered within 1 week via private Google Drive link</li>
</ul>

<h3>Perfect Timing</h3>
<p>Beachfront Elopements are most beautifully experienced during natural light windows that complement the coastal atmosphere.</p>
<ul>
  <li><strong>Morning (Approximately 7:00 – 9:00 AM)</strong> — Morning ceremonies offer softer winds, cooler temperatures, fewer visitors, and gentle natural light. The atmosphere feels calm, intimate, and serene.</li>
  <li><strong>Sunset (Approximately 5:00 – 6:30 PM)</strong> — Sunset provides dramatic golden tones across the ocean horizon. The light gradually softens into warm hues, creating a cinematic and romantic ambiance.</li>
</ul>
<p>Morning ceremonies are generally recommended for greater privacy, more stable wind conditions, softer lighting, and increased comfort. Final ceremony timing will be confirmed based on seasonal sunset variations, tide schedules, wind forecasts, and venue accessibility.</p>

<h3>Important Notes</h3>
<ul>
  <li>This package is intentionally curated to remain simple, elegant, and focused on the ceremony moment itself</li>
  <li>Only items listed above are included</li>
  <li>This package is designed for a couple only</li>
  <li>Ceremony timing will be confirmed once the location is selected, taking into consideration tides, natural light, wind conditions, and overall atmosphere</li>
  <li>Package rates start from <strong>IDR 25,000,000</strong></li>
</ul>

<h3>Weather &amp; Nature Conditions</h3>
<p>Beach environments are naturally dynamic and fully exposed to coastal climate conditions. Factors may include strong or shifting winds, sudden tropical rain, high heat and direct sun exposure, tide variations, sand movement and uneven terrain, and public access depending on location.</p>
<p>As these ceremonies take place in open coastal settings, weather and tidal conditions are beyond our control. In the event of rain, strong wind, or unsafe tide conditions, the ceremony may pause briefly to allow conditions to stabilize. If the venue provides a sheltered or indoor area, the ceremony may be relocated where possible. Floral installations and décor structures may be adjusted, secured, simplified, or repositioned to ensure safety. Styling elements may be modified due to wind intensity or sand conditions. Safety decisions made by the Planner or venue management are final.</p>
<p>The couple acknowledges that beachfront environments are subject to natural coastal forces and that weather or tidal changes are not grounds for cancellation, refund, or rescheduling unless otherwise agreed in writing.</p>

<h3>Payment &amp; Booking Conditions</h3>
<ul>
  <li>A 50% non-refundable deposit is required upon confirmation of booking</li>
  <li>The remaining 50% balance must be paid no later than 30 days prior to the event date</li>
  <li>The event date is not secured until the deposit has been received</li>
  <li>All payments made are non-refundable unless otherwise agreed in writing</li>
  <li>Failure to complete the final balance payment by the agreed deadline may result in cancellation of services without refund of the deposit</li>
  <li>Any requested changes to venue, ceremony date, or key elements after confirmation are subject to availability and may incur additional fees depending on vendor adjustments or venue policies</li>
  <li>Venue rental fees, permits, and access regulations (if applicable) follow the specific beachfront location's own policies and are separate unless explicitly included</li>
</ul>

<h3>Not Included</h3>
<p>The following can be arranged separately upon request: accommodation or stay, transportation, sound system or additional audio equipment, videography or drone, additional musicians or live entertainment, hair and makeup, wedding gown, suits, or accessories, rehearsals involving all vendors, and any items not explicitly listed under What's Included.</p>`,
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/v1776939442/Beachfront_Elopement_Wedding_eo6b6g.jpg",
    gallery: [
      {
        id: "beachfront-elopement-img-1",
        url: "https://res.cloudinary.com/dzerxindp/image/upload/v1776939442/Beachfront_Elopement_Wedding_eo6b6g.jpg",
        sort_order: 0,
        theme_id: "beachfront-elopement",
      },
    ],
    venue_id: "",
    venue: getVenue(""),
    experience_id: "3",
    experience: getExp("3"),
  },

  {
    id: "lake-elopement",
    slug: "lake-elopement",
    type: "ELOPEMENT",
    title: "Lake Elopements",
    description: `<p>Lake Elopements are designed for couples drawn to still waters, mountain air, and the quiet depth of reflection. Set beside Bali's serene lakes, where mist rises gently from the surface and distant hills frame the horizon, these ceremonies unfold within cool air, softened light, and a sense of grounded tranquility.</p>

<p>Here, the lake is not merely scenic. It shapes the ceremony's atmosphere, offering stillness, clarity, and a profound sense of presence.</p>

<p>Linda Wiryani Design and Event Planning works with a curated selection of lakeside venues and highland settings, where accessibility, privacy, climate conditions, and environmental harmony are thoughtfully considered. Venue selection honors both the natural landscape and surrounding community traditions.</p>

<blockquote><p>This ceremony is not designed to impress through excess, but to resonate through stillness, balance, and quiet connection. Soft mist. Calm water. And a vow reflected gently upon the lake.</p></blockquote>

<h3>What's Included</h3>

<h4>Ceremony Design &amp; Coordination</h4>
<ul>
  <li>Wedding ceremony planning and on-the-day coordination by Linda Wiryani Design &amp; Event Planning (1 pax)</li>
  <li>English-speaking local celebrant</li>
  <li>Custom-designed commemorative wedding certificate as a keepsake</li>
  <li>Venue access fees included (where applicable within agreed lakeside location)</li>
</ul>

<h4>Floral Styling <em>(Local Flowers | Refined &amp; Nature-Inspired)</em></h4>
<ul>
  <li>Ceremony backdrop styled using a harmonious blend of locally sourced fresh flowers, natural greenery, and select artificial elements, thoughtfully composed to complement the lakeside surroundings</li>
  <li>Flower petals along the ceremony walkway</li>
  <li>Floral aisle arrangements guided by organic form and natural simplicity</li>
  <li>Bridal bouquet using locally sourced flowers</li>
  <li>Groom's boutonniere coordinated with the overall floral palette</li>
</ul>

<h4>Music</h4>
<ul>
  <li>Solo guitarist or solo violinist providing understated, atmospheric ceremony music</li>
</ul>

<h4>Photography</h4>
<ul>
  <li>Professional photographer for 2 hours (1 pax)</li>
  <li>Carefully curated and edited best-selected images</li>
  <li>Final images delivered within 1 week via private Google Drive link</li>
</ul>

<h3>Perfect Timing</h3>
<p>Lake Elopements are most beautifully experienced during times when light and atmosphere feel most balanced.</p>
<ul>
  <li><strong>Morning (Approximately 7:00 – 9:00 AM)</strong> — Morning ceremonies often offer calm water surfaces, soft diffused light, and a serene atmosphere before visitor activity increases. Mist may add a poetic and ethereal quality to the setting.</li>
  <li><strong>Late Afternoon (Approximately 4:30 – 6:00 PM)</strong> — Late afternoon provides warmer tones across the water and surrounding hills, creating depth and subtle golden reflections.</li>
</ul>
<p>Morning timing is generally recommended for more stable wind conditions, calmer water surface, greater privacy, and softer lighting. Final ceremony timing will be confirmed based on seasonal weather patterns, visibility conditions, wind movement, and venue accessibility.</p>

<h3>Important Notes</h3>
<ul>
  <li>This package is intentionally curated to remain simple, elegant, and focused on the ceremony moment itself</li>
  <li>Only items listed above are included</li>
  <li>This package is designed for a couple only</li>
  <li>Ceremony timing will be confirmed once the location is selected, taking into consideration mountain light, mist conditions, wind patterns, and overall atmosphere</li>
  <li>Package rates start from <strong>IDR 25,000,000</strong></li>
</ul>

<h3>Weather &amp; Nature Conditions</h3>
<p>Lake environments are influenced by highland and mountain climate conditions. Weather can shift more quickly than in coastal areas. Factors may include morning mist or fog, sudden rainfall, cooler temperatures, wind across open water, humidity fluctuations, and seasonal water level changes.</p>
<p>As these ceremonies take place in natural outdoor settings, weather and environmental conditions are beyond our control. In the event of rain, strong wind, or dense fog, the ceremony may pause briefly to allow conditions to settle. If the venue provides a covered or indoor area, the ceremony may be relocated where possible. Floral installations and décor structures may be secured, simplified, or repositioned to ensure safety and aesthetic balance. Visibility limitations caused by mist or fog are considered natural conditions of the setting. Safety decisions made by the Planner or venue management are final.</p>
<p>The couple acknowledges that lake and mountain environments are subject to natural weather variations and that such conditions are not grounds for cancellation, refund, or rescheduling unless otherwise agreed in writing.</p>

<h3>Payment &amp; Booking Conditions</h3>
<ul>
  <li>A 50% non-refundable deposit is required upon confirmation of booking</li>
  <li>The remaining 50% balance must be paid no later than 30 days prior to the event date</li>
  <li>The event date is not considered secured until the deposit has been received</li>
  <li>All payments made are non-refundable unless otherwise agreed in writing</li>
  <li>Failure to complete the final balance payment by the agreed deadline may result in cancellation of services without refund of the initial deposit</li>
  <li>Any requested changes to venue, ceremony date, or key elements after confirmation are subject to availability and may incur additional fees depending on vendor adjustments or venue policies</li>
  <li>Venue access fees and local permits (if applicable) follow the respective location's policies and are separate unless explicitly included</li>
</ul>

<h3>Not Included</h3>
<p>The following can be arranged separately upon request: accommodation or stay, transportation, sound system or additional audio equipment, videography or drone, additional musicians or live entertainment, hair and makeup, wedding gown, suits, or accessories, rehearsals involving all vendors, and any items not explicitly listed under What's Included.</p>`,
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/v1776939447/Lake_Elopement_hbxm9l.png",
    gallery: [
      {
        id: "lake-elopement-img-1",
        url: "https://res.cloudinary.com/dzerxindp/image/upload/v1776939447/Lake_Elopement_hbxm9l.png",
        sort_order: 0,
        theme_id: "lake-elopement",
      },
    ],
    venue_id: "",
    venue: getVenue(""),
    experience_id: "3",
    experience: getExp("3"),
  },

  {
    id: "volcano-mountain-elopement",
    slug: "volcano-mountain-elopement",
    type: "ELOPEMENT",
    title: "Volcano & Mountain Elopements",
    description: `<p>Volcano and Mountain Elopements are designed for couples drawn to elevation, vast horizons, and the quiet strength of the earth. Set against Bali's majestic volcanic landscapes and highland ridgelines, where clouds drift across peaks and morning light unfolds slowly over the terrain, these ceremonies take place within crisp air, expansive views, and a profound sense of grounding.</p>

<p>Here, the mountain is not merely scenic. It shapes the ceremony's atmosphere, offering perspective, resilience, and a powerful stillness that feels both intimate and infinite.</p>

<p>Linda Wiryani Design and Event Planning works with a curated selection of mountain viewpoints and volcanic landscapes, where accessibility, safety conditions, terrain, and environmental respect are carefully considered. Venue selection honors the natural topography as well as local cultural sensitivities connected to sacred mountain areas.</p>

<blockquote><p>This ceremony is not designed to impress through excess, but to resonate through altitude, presence, and quiet power. Crisp air. Vast horizon. And a moment held firmly at the edge of the earth.</p></blockquote>

<h3>What's Included</h3>

<h4>Ceremony Design &amp; Coordination</h4>
<ul>
  <li>Wedding ceremony planning and on-the-day coordination by Linda Wiryani Design &amp; Event Planning (1 pax)</li>
  <li>English-speaking local celebrant</li>
  <li>Custom-designed commemorative wedding certificate as a keepsake</li>
  <li>Venue access fees included (where applicable within agreed mountain or volcano location)</li>
</ul>

<h4>Floral Styling <em>(Local Flowers | Refined &amp; Organic)</em></h4>
<ul>
  <li>Ceremony backdrop styled using a harmonious blend of locally sourced fresh flowers, natural greenery, and select artificial elements, thoughtfully composed to complement the volcanic or mountain landscape</li>
  <li>Flower petals along the ceremony walkway</li>
  <li>Floral aisle arrangements guided by organic form and natural restraint</li>
  <li>Bridal bouquet using locally sourced flowers</li>
  <li>Groom's boutonniere coordinated with the overall floral palette</li>
</ul>

<h4>Music</h4>
<ul>
  <li>Solo guitarist or solo violinist providing understated, atmospheric ceremony music</li>
</ul>

<h4>Photography</h4>
<ul>
  <li>Professional photographer for 2 hours (1 pax)</li>
  <li>Carefully curated and edited best-selected images</li>
  <li>Final images delivered within 1 week via private Google Drive link</li>
</ul>

<h3>Perfect Timing</h3>
<p>Volcano &amp; Mountain Elopements are most beautifully experienced when light and visibility align with the landscape's natural rhythm.</p>
<ul>
  <li><strong>Early Morning (Approximately 6:30 – 8:30 AM)</strong> — Morning is generally the most recommended timing. Skies tend to be clearer, wind conditions calmer, and visibility stronger before clouds gather. The atmosphere feels fresh, expansive, and quietly powerful.</li>
  <li><strong>Late Afternoon (Approximately 4:30 – 6:00 PM)</strong> — Late afternoon may offer warm golden tones across the terrain; however, visibility can vary depending on cloud movement and elevation.</li>
</ul>
<p>Morning ceremonies are strongly recommended for clearer mountain views, more stable wind conditions, better visibility, and greater comfort and safety. Final timing will be confirmed based on seasonal weather patterns, cloud formation tendencies, wind forecasts, and accessibility conditions.</p>

<h3>Important Notes</h3>
<ul>
  <li>This package is intentionally curated to remain simple, elegant, and focused on the ceremony moment itself</li>
  <li>Only items listed above are included</li>
  <li>This package is designed for a couple only</li>
  <li>Ceremony timing will be confirmed once the location is selected, taking into consideration sunrise or sunset light, cloud movement, wind conditions, and overall atmosphere</li>
  <li>Package rates start from <strong>IDR 25,000,000</strong></li>
</ul>

<h3>Weather &amp; Nature Conditions</h3>
<p>Mountain and volcanic environments are naturally dynamic and influenced by elevation and seasonal climate patterns. Conditions may include rapid weather changes, strong or sudden wind exposure, cooler temperatures, morning mist or cloud movement, occasional limited visibility, uneven or natural terrain, and restricted access in certain sacred or protected areas.</p>
<p>As these ceremonies take place in elevated outdoor settings, weather and terrain conditions are beyond our control. In the event of rain, strong wind, heavy mist, or reduced visibility, the ceremony may pause temporarily to allow conditions to stabilize. Where possible, the ceremony may be repositioned to a safer nearby area within the venue. Floral structures and décor elements may be secured, simplified, or adjusted to ensure safety and structural integrity. Safety decisions made by the Planner or venue management are final.</p>
<p>Mountain environments may experience stronger wind conditions than coastal or lowland areas. The couple acknowledges that such environmental factors are inherent to elevated landscapes and are not grounds for cancellation, refund, or rescheduling unless otherwise agreed in writing. Safety, terrain awareness, and respect for local cultural sensitivities surrounding sacred mountains remain priorities at all times.</p>

<h3>Payment &amp; Booking Conditions</h3>
<ul>
  <li>A 50% non-refundable deposit is required upon confirmation of booking</li>
  <li>The remaining 50% balance must be paid no later than 30 days prior to the event date</li>
  <li>The event date is not secured until the deposit has been received</li>
  <li>All payments made are non-refundable unless otherwise agreed in writing</li>
  <li>Failure to complete the final balance payment by the agreed deadline may result in cancellation of services without refund of the deposit</li>
  <li>Any requested changes to venue, ceremony date, timing, or key elements after confirmation are subject to availability and may incur additional fees depending on logistical complexity, permit requirements, or vendor rescheduling</li>
  <li>Access permits and local regulations (if applicable) follow the specific mountain or volcano location's policies</li>
</ul>

<h3>Not Included</h3>
<p>The following can be arranged separately upon request: accommodation or stay, transportation (mountain access may require specific vehicles), sound system or additional audio equipment, videography or drone, additional musicians or live entertainment, hair and makeup, wedding gown, suits, or accessories, rehearsals involving all vendors, and any items not explicitly listed under What's Included.</p>`,
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/v1776939447/Volcano_mount_batur_y3gtwu.png",
    gallery: [
      {
        id: "volcano-mountain-elopement-img-1",
        url: "https://res.cloudinary.com/dzerxindp/image/upload/v1776939447/Volcano_mount_batur_y3gtwu.png",
        sort_order: 0,
        theme_id: "volcano-mountain-elopement",
      },
    ],
    venue_id: "",
    venue: getVenue(""),
    experience_id: "3",
    experience: getExp("3"),
  },

  {
    id: "riverside-elopement",
    slug: "riverside-elopement",
    type: "ELOPEMENT",
    title: "Riverside Elopements",
    description: `<p>Riverside Elopements are designed for couples drawn to flowing water, natural contours, and the quiet rhythm of the land shaped by the river's edge. Set alongside Bali's rivers, these ceremonies unfold within layered greenery, gentle movement, and a sense of calm that feels both grounded and alive.</p>

<p>Here, nature is not styled over or reshaped. It sets the tone, pace, and emotional atmosphere of the ceremony.</p>

<p>Linda Wiryani Design and Event Planning works with a curated selection of riverside locations, jungle riverbanks, and nature-integrated venues where water, landscape, and design exist in quiet harmony. Venue selection is guided by accessibility, safety, and sensitivity to the natural surroundings.</p>

<blockquote><p>This ceremony is not designed to impress through excess, but to resonate through movement, balance, and connection to nature. Flowing water. Soft currents. And a moment carried gently along the river.</p></blockquote>

<h3>What's Included</h3>

<h4>Ceremony Design &amp; Coordination</h4>
<ul>
  <li>Wedding ceremony planning and on-the-day coordination by Linda Wiryani Design &amp; Event Planning (1 pax)</li>
  <li>English-speaking local celebrant</li>
  <li>Custom-designed commemorative wedding certificate as a keepsake</li>
  <li>Venue access fees included</li>
</ul>

<h4>Floral Styling <em>(Local Flowers | Refined &amp; Natural)</em></h4>
<ul>
  <li>Ceremony backdrop styled using a harmonious blend of locally sourced fresh flowers, natural greenery, and select artificial elements, thoughtfully composed to complement the riverside surroundings</li>
  <li>Flower petals along the ceremony walkway</li>
  <li>Floral aisle arrangements guided by organic form and natural movement</li>
  <li>Bridal bouquet using local flowers</li>
  <li>Groom's boutonniere coordinated with the overall floral palette</li>
</ul>

<h4>Music</h4>
<ul>
  <li>Solo guitarist or solo violinist providing understated, atmospheric ceremony music</li>
</ul>

<h4>Photography</h4>
<ul>
  <li>Professional photographer for 2 hours (1 pax)</li>
  <li>Carefully curated and edited best-selected images</li>
  <li>Final images delivered within 1 week via private Google Drive link</li>
</ul>

<h3>Perfect Timing</h3>
<p>Riverside Elopements are most beautifully experienced during natural light windows that complement the movement of water and surrounding landscape.</p>
<ul>
  <li><strong>Morning (Approximately 7:00 – 9:00 AM)</strong> — Morning offers cooler air, softer light, and calmer environmental conditions. The atmosphere feels fresh, quiet, and grounded, with reduced public activity.</li>
  <li><strong>Late Afternoon (Approximately 4:30 – 6:00 PM)</strong> — Late afternoon provides warmer tones and gentle reflections along the river surface. Light becomes softer and more atmospheric, creating depth within the landscape.</li>
</ul>
<p>Exact timing will be confirmed based on natural light direction, river flow and safety conditions, seasonal weather patterns, accessibility and venue regulations, and overall comfort and safety. Morning ceremonies generally provide more stable conditions and a more serene atmosphere.</p>

<h3>Important Notes</h3>
<ul>
  <li>This package is intentionally curated to remain simple, elegant, and focused on the ceremony moment itself</li>
  <li>Only items listed above are included</li>
  <li>This package is designed for a couple only</li>
  <li>Ceremony timing will be confirmed once the venue is selected, taking into consideration natural light, river flow, and overall environmental conditions</li>
  <li>Package rates start from <strong>IDR 30,000,000</strong></li>
</ul>

<h3>Weather &amp; Nature Conditions</h3>
<p>Riverside environments are naturally dynamic and influenced by tropical weather patterns and water flow conditions. Conditions may include sudden rainfall or passing showers, changes in river water levels or flow intensity, humidity and natural mist, uneven or natural terrain near the riverbank, insects and surrounding vegetation, and ambient sound from flowing water.</p>
<p>As these ceremonies take place in natural outdoor settings, weather and environmental conditions are beyond our control. In the event of rain or increased water flow, there is no guaranteed fixed indoor backup venue unless specifically provided by the selected location. The ceremony may pause briefly to allow conditions to stabilize, or where possible, be repositioned within a naturally sheltered or safer area. Floral elements and décor may be adjusted, secured, or simplified to ensure safety and structural stability.</p>
<p>The couple acknowledges that riverside environments are living natural systems and that such conditions are not grounds for cancellation, refund, or rescheduling unless otherwise agreed in writing. Safety and environmental respect remain the highest priority at all times.</p>

<h3>Payment &amp; Booking Conditions</h3>
<ul>
  <li>A 50% non-refundable deposit is required upon confirmation of booking</li>
  <li>The remaining 50% balance must be paid no later than 30 days prior to the event date</li>
  <li>The event date is not considered secured until the deposit has been received</li>
  <li>All payments made are non-refundable unless otherwise stated in writing</li>
  <li>Failure to complete the final balance payment by the agreed deadline may result in cancellation of services without refund of the initial deposit</li>
  <li>Any requested changes to the venue, ceremony date, or key design elements after confirmation are subject to availability and may incur additional fees depending on logistical or vendor adjustments</li>
  <li>Venue access fees and any location-specific permits follow the respective venue's own policies where applicable</li>
</ul>

<h3>Not Included</h3>
<p>The following can be arranged separately upon request: venue or event fees (if applicable), accommodation or stay, transportation, sound system or additional audio equipment, videography or drone, additional musicians or live entertainment, hair and makeup, wedding gown, suits, or accessories, rehearsals involving all vendors, and any items not explicitly listed under What's Included.</p>`,
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/v1776939444/Riverside_Elopement_ccm8dy.png",
    gallery: [
      {
        id: "riverside-elopement-img-1",
        url: "https://res.cloudinary.com/dzerxindp/image/upload/v1776939444/Riverside_Elopement_ccm8dy.png",
        sort_order: 0,
        theme_id: "riverside-elopement",
      },
    ],
    venue_id: "",
    venue: getVenue(""),
    experience_id: "3",
    experience: getExp("3"),
  },

  {
    id: "eco-sustainable-elopement",
    slug: "eco-sustainable-elopement",
    type: "ELOPEMENT",
    title: "Eco & Sustainable Weddings",
    description: `<p>Eco &amp; Sustainable Weddings are designed for couples who value mindful celebration, environmental responsibility, and a deeper connection to place. These ceremonies are guided not by excess, but by intention — where each element is considered for its impact, origin, and purpose.</p>

<p>Set within natural or thoughtfully selected venues, these celebrations embrace simplicity, local materials, and conscious design, allowing beauty to emerge through restraint and awareness.</p>

<blockquote><p>Here, sustainability is not an aesthetic. It is a philosophy that shapes every decision — from materials and florals to scale, sourcing, and experience. Conscious choices. Natural materials. And a moment held with care for both people and place.</p></blockquote>

<p>Linda Wiryani Design and Event Planning works with a curated network of eco-conscious venues, local artisans, and responsible suppliers, ensuring each celebration aligns with both environmental sensitivity and refined design standards.</p>

<h3>What's Included</h3>

<h4>Ceremony Design &amp; Coordination</h4>
<ul>
  <li>Wedding ceremony planning and on-the-day coordination by Linda Wiryani Design &amp; Event Planning (1 pax)</li>
  <li>English-speaking local celebrant</li>
  <li>Custom-designed commemorative wedding certificate as a keepsake</li>
  <li>Venue access fees included (where applicable)</li>
</ul>

<h4>Floral Styling <em>(Local &amp; Conscious Design)</em></h4>
<ul>
  <li>Ceremony backdrop styled using a thoughtful blend of locally sourced fresh flowers, natural greenery, and select reusable or artificial elements to minimise waste</li>
  <li>Flower petals along the ceremony walkway (where environmentally appropriate)</li>
  <li>Floral aisle arrangements guided by natural simplicity and low-impact design</li>
  <li>Bridal bouquet using locally sourced flowers</li>
  <li>Groom's boutonniere coordinated with the overall floral palette</li>
</ul>

<h4>Music</h4>
<ul>
  <li>Solo guitarist or solo violinist providing understated, atmospheric ceremony music</li>
</ul>

<h4>Photography</h4>
<ul>
  <li>Professional photographer for 2 hours (1 pax)</li>
  <li>Carefully curated and edited best-selected images</li>
  <li>Final images delivered within 1 week via private Google Drive link</li>
</ul>

<h3>Important Notes</h3>
<ul>
  <li>This package is intentionally curated to remain simple, elegant, and environmentally conscious</li>
  <li>Only items listed above are included</li>
  <li>Design and material selections will prioritize sustainability, local sourcing, and minimal environmental impact</li>
  <li>Ceremony timing and setup will be adapted to the selected venue and environmental conditions</li>
  <li>Package rates start from <strong>IDR 25,000,000</strong></li>
  <li>This package is designed for a couple only</li>
</ul>

<h3>Not Included</h3>
<p>The following can be arranged separately upon request: accommodation or stay, transportation (eco-conscious options available upon request), sound system or additional audio equipment, videography or drone, additional musicians or live entertainment, hair and makeup, wedding gown, suits, or accessories, rehearsals involving all vendors, and any items not explicitly listed under What's Included.</p>

<h3>Weather &amp; Nature Conditions</h3>
<p>Eco &amp; Sustainable Weddings often take place in natural or semi-outdoor environments and are therefore influenced by surrounding climate and environmental conditions. Conditions may include sudden tropical rain, wind and natural airflow, heat and humidity, and terrain variations depending on location.</p>
<p>As these ceremonies prioritize harmony with nature, environmental conditions are embraced rather than controlled. In the event of unfavorable weather, the ceremony may proceed as scheduled where safely possible, pause briefly or be repositioned within a sheltered area if available, or have design elements adjusted or simplified to maintain safety while minimizing environmental impact. No excessive structural installations or environmentally disruptive solutions will be introduced as backup measures.</p>
<p>The couple acknowledges that eco-conscious celebrations are designed in alignment with nature, and that weather conditions are not grounds for cancellation, refund, or rescheduling unless otherwise agreed in writing.</p>

<h3>Payment &amp; Booking Conditions</h3>
<ul>
  <li>A 50% non-refundable deposit is required upon confirmation of booking</li>
  <li>The remaining 50% balance must be paid no later than 30 days prior to the event date</li>
  <li>The event date is not considered secured until the deposit has been received</li>
  <li>All payments made are non-refundable unless otherwise stated in writing</li>
  <li>Failure to complete the final balance payment by the agreed deadline may result in cancellation of services without refund of the initial deposit</li>
  <li>Any requested changes to venue, ceremony date, or design elements after confirmation are subject to availability and may incur additional fees depending on adjustments required</li>
  <li>Venue policies, permits, and sustainability guidelines will follow the respective location's regulations</li>
</ul>

<h3>Perfect Timing</h3>
<p>Eco &amp; Sustainable Weddings are best experienced during natural light windows that reduce environmental impact and enhance comfort.</p>
<ul>
  <li><strong>Morning (Approximately 7:00 – 9:00 AM)</strong> — Morning offers cooler temperatures, softer light, and reduced energy usage. The atmosphere feels calm, fresh, and aligned with natural rhythms.</li>
  <li><strong>Late Afternoon (Approximately 4:30 – 6:00 PM)</strong> — Late afternoon provides warm, natural light and a relaxed atmosphere while minimizing the need for artificial lighting.</li>
</ul>
<p>Morning ceremonies are generally preferred for lower environmental impact and more stable conditions. Final timing will be confirmed based on natural light conditions, environmental considerations, venue guidelines, and overall comfort and sustainability approach.</p>`,
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/v1776939444/Eco_and_Sustainable_Weddings_twb9v2.png",
    gallery: [
      {
        id: "eco-sustainable-elopement-img-1",
        url: "https://res.cloudinary.com/dzerxindp/image/upload/v1776939444/Eco_and_Sustainable_Weddings_twb9v2.png",
        sort_order: 0,
        theme_id: "eco-sustainable-elopement",
      },
    ],
    venue_id: "",
    venue: getVenue(""),
    experience_id: "3",
    experience: getExp("3"),
  },

  {
    id: "sacred-spiritual-elopement",
    slug: "sacred-spiritual-elopement",
    type: "ELOPEMENT",
    title: "Sacred or Spiritual Elopements",
    description: `<p>Sacred or Spiritual Elopements are designed for couples drawn to stillness, intention, and moments of quiet reflection. These ceremonies are emotion-centered rather than culture-centered, guided by personal belief, shared meaning, and inner clarity rather than formal tradition.</p>

<p>Set within serene natural surroundings or intimate architectural spaces, the celebration unfolds with simplicity and depth. It may include private vows, intention-setting, silent blessings, or symbolic gestures such as candle lighting, a gentle water ritual, or a shared moment of meditation.</p>

<blockquote><p>Here, spirituality is not performative. It is personal, inward, and quietly profound. A moment of stillness. A shared intention. And a vow held gently within silence.</p></blockquote>

<p>Linda Wiryani Design and Event Planning works closely with each couple to shape a ceremony that reflects their values and emotional journey. The structure is flexible and does not require adherence to a specific religious or cultural framework. Every detail is curated with sensitivity, respect, and authenticity.</p>

<h3>What's Included</h3>

<h4>Ceremony Design &amp; Coordination</h4>
<ul>
  <li>Wedding ceremony planning and on-the-day coordination by Linda Wiryani Design &amp; Event Planning (1 pax)</li>
  <li>English-speaking celebrant or facilitator</li>
  <li>Custom-designed commemorative wedding certificate as a keepsake</li>
  <li>Venue access fees included (where applicable within selected location)</li>
</ul>

<h4>Ceremony Structure</h4>
<ul>
  <li>Personal vow guidance and ceremony flow design</li>
  <li>Optional symbolic elements (candle lighting, intention-setting, or a simple water ritual)</li>
  <li>Thoughtfully curated ceremony script aligned with the couple's beliefs</li>
</ul>

<h4>Floral Styling <em>(Local Flowers | Refined &amp; Subtle)</em></h4>
<ul>
  <li>Ceremony styling using a harmonious blend of locally sourced fresh flowers, natural greenery, and select artificial elements, composed with restraint and quiet balance</li>
  <li>Bridal bouquet using local flowers</li>
  <li>Groom's boutonniere coordinated with the overall palette</li>
</ul>

<h4>Music <em>(Meditative &amp; Minimal)</em></h4>
<ul>
  <li>Sound healing (e.g., Tibetan or crystal bowls), or</li>
  <li>Soft bamboo flute (suling), or</li>
  <li>Rindik, traditional Balinese musical instrument made primarily of bamboo, or</li>
  <li>Natural silence, allowing the surrounding environment to become the soundscape</li>
</ul>
<p><em>Music is intentionally understated, allowing the ceremony to remain calm, present, and inward.</em></p>

<h4>Photography</h4>
<ul>
  <li>Professional photographer for 2 hours (1 pax)</li>
  <li>Carefully curated and edited best-selected images</li>
  <li>Final images delivered within 1 week via private Google Drive link</li>
</ul>

<h3>Important Notes</h3>
<ul>
  <li>This package is intentionally curated to remain simple, elegant, and centered on emotional presence</li>
  <li>Only items listed above are included</li>
  <li>Ceremony timing will be confirmed based on the selected venue and preferred atmosphere</li>
  <li>Early morning or soft daylight hours are often recommended to support calm, clarity, and focus</li>
  <li>Sacred &amp; Spiritual Elopements are personal and universal in nature, and are not tied to any specific religion or cultural framework</li>
  <li>Package rates start from <strong>IDR 30,000,000</strong></li>
  <li>This package is designed for a couple only</li>
</ul>

<h3>Not Included</h3>
<p>The following can be arranged separately upon request: accommodation or stay, transportation, sound system or additional audio equipment (if required beyond the minimal approach), videography or drone, additional musicians or ceremonial facilitators, hair and makeup, wedding gown, suits, or accessories, rehearsals involving all vendors, and any items not explicitly listed under What's Included.</p>

<h3>Weather &amp; Nature Conditions</h3>
<p>Sacred &amp; Spiritual Elopements may take place in both outdoor and semi-outdoor environments, and are therefore influenced by natural conditions. Conditions may include sudden rain or shifting weather, wind or natural environmental movement, and light and temperature variations depending on location.</p>
<p>As these ceremonies are designed to remain flexible and responsive, environmental conditions are embraced as part of the experience. In the event of unfavorable weather, the ceremony may proceed as scheduled where safely possible, pause briefly to allow conditions to settle, be repositioned within a sheltered or indoor area where available, or have elements of the ceremony simplified to preserve calm and continuity.</p>
<p>The couple acknowledges that natural conditions are inherent to the setting and are not grounds for cancellation, refund, or rescheduling unless otherwise agreed in writing.</p>

<h3>Payment &amp; Booking Conditions</h3>
<ul>
  <li>A 50% non-refundable deposit is required upon confirmation of booking</li>
  <li>The remaining 50% balance must be paid no later than 30 days prior to the event date</li>
  <li>The event date is not considered secured until the deposit has been received</li>
  <li>All payments made are non-refundable unless otherwise stated in writing</li>
  <li>Failure to complete the final balance payment by the agreed deadline may result in cancellation of services without refund of the initial deposit</li>
  <li>Any requested changes to the ceremony date, location, or structure after confirmation are subject to availability and may incur additional fees depending on adjustments required</li>
  <li>Venue access fees and any applicable permits follow the respective location's policies</li>
</ul>

<h3>Perfect Timing</h3>
<p>Sacred &amp; Spiritual Elopements are most beautifully experienced during times that support calm, focus, and emotional presence.</p>
<ul>
  <li><strong>Morning (Approximately 7:00 – 9:00 AM)</strong> — Morning offers stillness, clarity, and a quiet environment. The atmosphere feels fresh, grounded, and uninterrupted — ideal for inward reflection and intentional moments.</li>
  <li><strong>Late Afternoon (Approximately 4:30 – 6:00 PM)</strong> — Late afternoon provides softer light and a gentle transition into evening, creating a warm and reflective atmosphere.</li>
</ul>
<p>Morning ceremonies are generally recommended for deeper stillness and minimal external distraction. Final timing will be guided by the desired emotional tone of the ceremony, natural light conditions, environmental quietness, and venue setting and accessibility.</p>`,
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/v1776939444/Sacred_or_Spiritual_Elopement_eelmde.png",
    gallery: [
      {
        id: "sacred-spiritual-elopement-img-1",
        url: "https://res.cloudinary.com/dzerxindp/image/upload/v1776939444/Sacred_or_Spiritual_Elopement_eelmde.png",
        sort_order: 0,
        theme_id: "sacred-spiritual-elopement",
      },
    ],
    venue_id: "",
    venue: getVenue(""),
    experience_id: "3",
    experience: getExp("3"),
  },

  {
    id: "cultural-heritage-elopement",
    slug: "cultural-heritage-elopement",
    type: "ELOPEMENT",
    title: "Cultural & Heritage-Inspired Ceremonies",
    description: `<p>Cultural &amp; Heritage-Inspired Ceremonies are designed for couples who wish to honor tradition in a way that feels refined, meaningful, and personally relevant. These ceremonies are not defined by rigid formality, but by thoughtful interpretation — where cultural elements are carefully selected, respectfully adapted, and seamlessly integrated into a contemporary celebration.</p>

<p>Set within curated venues, from private villas to heritage-inspired spaces, the ceremony unfolds with intention, symbolism, and a sense of quiet reverence.</p>

<blockquote><p>Here, tradition is not performed in its entirety. It is distilled, refined, and expressed with clarity and respect. A gesture of meaning. A sense of heritage. And a moment that bridges past and present.</p></blockquote>

<p>Linda Wiryani Design and Event Planning approaches each cultural ceremony with sensitivity and care, ensuring that every element is both authentic and appropriately contextualized. Cultural references may be Balinese, Indonesian, or inspired by the couple's own heritage.</p>

<h3>What's Included</h3>

<h4>Ceremony Design &amp; Coordination</h4>
<ul>
  <li>Wedding ceremony planning and on-the-day coordination by Linda Wiryani Design &amp; Event Planning (1 pax)</li>
  <li>English-speaking celebrant or cultural facilitator (where applicable)</li>
  <li>Custom-designed commemorative wedding certificate as a keepsake</li>
  <li>Venue access fees included (where applicable)</li>
</ul>

<h4>Cultural Ceremony Elements <em>(Curated &amp; Refined)</em></h4>
<ul>
  <li>Guidance on selecting meaningful cultural or symbolic elements</li>
  <li>Simplified and thoughtfully curated ceremonial flow</li>
  <li>Optional inclusion of traditional gestures (adapted respectfully), such as blessing rituals, offering elements, and symbolic exchanges</li>
  <li>Coordination with local cultural practitioners where appropriate</li>
</ul>

<h4>Floral Styling <em>(Local Flowers | Refined &amp; Contextual)</em></h4>
<ul>
  <li>Ceremony styling using a harmonious blend of locally sourced fresh flowers, natural greenery, and select artificial elements</li>
  <li>Design adapted to reflect cultural tone while maintaining Linda Wiryani Design and Event Planning's refined aesthetic</li>
  <li>Bridal bouquet using local flowers</li>
  <li>Groom's boutonniere coordinated with the overall palette</li>
</ul>

<h4>Music <em>(Subtle &amp; Contextual)</em></h4>
<ul>
  <li>Soft traditional or instrumental music where appropriate, or minimal modern accompaniment aligned with the ceremony tone</li>
</ul>
<p><em>Music is curated to support the atmosphere without overpowering the ceremony.</em></p>

<h4>Photography</h4>
<ul>
  <li>Professional photographer for 2 hours (1 pax)</li>
  <li>Carefully curated and edited best-selected images</li>
  <li>Final images delivered within 1 week via private Google Drive link</li>
</ul>

<h3>Important Notes</h3>
<ul>
  <li>This package is intentionally curated to remain refined, respectful, and not overly ceremonial</li>
  <li>Only selected cultural elements will be incorporated, rather than full traditional rituals</li>
  <li>The ceremony is adapted to suit the couple's comfort, belief system, and level of cultural engagement</li>
  <li>Cultural sensitivity and appropriateness are prioritized at all times</li>
  <li>Package rates start from <strong>IDR 35,000,000</strong></li>
  <li>This package is designed for a couple only</li>
</ul>

<h3>Not Included</h3>
<p>The following can be arranged separately upon request: full traditional or religious ceremonies, extensive ceremonial rituals requiring multiple practitioners, hair and makeup, traditional attire (kebaya, kain and/or sarong, accessories), additional cultural performers, accommodation or stay, transportation, videography or drone, and any items not explicitly listed under What's Included.</p>

<h3>Weather &amp; Nature Conditions</h3>
<p>Cultural &amp; Heritage-Inspired Ceremonies may take place in outdoor or semi-outdoor environments and are therefore subject to natural conditions. Weather, light, and environmental factors remain beyond the control of the Planner. In the event of unfavorable weather, the ceremony may proceed as scheduled where safely possible, pause briefly or be repositioned within a covered or indoor space if available, or have certain ceremonial elements simplified or adapted. Weather conditions are not grounds for cancellation, refund, or rescheduling unless otherwise agreed in writing.</p>

<h3>Perfect Timing</h3>
<p>Cultural ceremonies are best experienced during moments of natural calm and balance.</p>
<ul>
  <li><strong>Morning (Approximately 7:00 – 9:00 AM)</strong> — Soft light and quiet atmosphere support a respectful and grounded ceremony.</li>
  <li><strong>Late Afternoon (Approximately 4:30 – 6:00 PM)</strong> — Warm tones create a more atmospheric and visually rich setting.</li>
</ul>
<p>Final timing will be guided by the cultural flow of the ceremony, light conditions, venue setting, and overall atmosphere.</p>`,
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/v1776939445/Cultural_Heritage-Inspired_Ceremonies_muscyz.png",
    gallery: [
      {
        id: "cultural-heritage-elopement-img-1",
        url: "https://res.cloudinary.com/dzerxindp/image/upload/v1776939445/Cultural_Heritage-Inspired_Ceremonies_muscyz.png",
        sort_order: 0,
        theme_id: "cultural-heritage-elopement",
      },
    ],
    venue_id: "",
    venue: getVenue(""),
    experience_id: "3",
    experience: getExp("3"),
  },

  {
    id: "sunrise-purification-elopement",
    slug: "sunrise-purification-elopement",
    type: "ELOPEMENT",
    title: "Sunrise or Purification-Led Moments",
    description: `<p>Sunrise or Purification-Led Moments are designed for couples drawn to renewal, clarity, and quiet beginnings. These ceremonies are shaped by the gentle transition of light or the symbolic act of cleansing, marking a meaningful threshold into a new chapter.</p>

<p>Set during the early hours of the day or within serene water-based settings, these experiences unfold with calm intention, softened light, and a sense of emotional reset.</p>

<blockquote><p>Here, the moment is not defined by scale. It is defined by presence, stillness, and quiet transformation. First light. Still water. And a beginning held gently in calm.</p></blockquote>

<p>Linda Wiryani Design and Event Planning approaches these ceremonies with sensitivity and restraint — allowing space for reflection, grounding, and symbolic gestures that feel personal and unforced.</p>

<h3>What's Included</h3>

<h4>Ceremony Design &amp; Coordination</h4>
<ul>
  <li>Wedding ceremony planning and on-the-day coordination by Linda Wiryani Design &amp; Event Planning (1 pax)</li>
  <li>English-speaking celebrant or facilitator</li>
  <li>Custom-designed commemorative wedding certificate as a keepsake</li>
  <li>Venue access fees included (where applicable within selected location)</li>
</ul>

<h4>Ceremony Structure <em>(Renewal &amp; Intention)</em></h4>
<ul>
  <li>Guided ceremony flow focused on beginnings, reflection, and intention-setting</li>
  <li>Optional symbolic elements such as gentle water purification or cleansing ritual, silent reflection or meditation, and personal vow exchange or intention-setting</li>
  <li>Thoughtfully curated ceremony script aligned with the couple's emotional journey</li>
</ul>

<h4>Floral Styling <em>(Local Flowers | Light &amp; Minimal)</em></h4>
<ul>
  <li>Ceremony styling using a refined blend of locally sourced fresh flowers, natural greenery, and select artificial elements</li>
  <li>Designed with lightness and restraint to complement the softness of morning or water-based settings</li>
  <li>Bridal bouquet using local flowers</li>
  <li>Groom's boutonniere coordinated with the overall palette</li>
</ul>

<h4>Music <em>(Soft &amp; Reflective)</em></h4>
<ul>
  <li>Sound healing (e.g., Tibetan or crystal bowls), or</li>
  <li>Soft bamboo flute (suling), or</li>
  <li>Rindik, traditional Balinese musical instrument made primarily of bamboo, or</li>
  <li>Natural silence, allowing the environment to shape the soundscape</li>
</ul>
<p><em>Music remains minimal and unobtrusive.</em></p>

<h4>Photography</h4>
<ul>
  <li>Professional photographer for 2 hours (1 pax)</li>
  <li>Carefully curated and edited best-selected images</li>
  <li>Final images delivered within 1 week via private Google Drive link</li>
</ul>

<h3>Important Notes</h3>
<ul>
  <li>This package is intentionally curated to remain calm, minimal, and emotionally centered</li>
  <li>Only items listed above are included</li>
  <li>Ceremony timing is essential to the experience and will be carefully planned around sunrise or quiet daylight moments</li>
  <li>Purification elements are symbolic and adapted respectfully, without requiring full religious ceremony unless requested</li>
  <li>The experience is designed to feel personal, grounded, and unhurried</li>
  <li>Package rates start from <strong>IDR 35,000,000</strong></li>
  <li>This package is designed for a couple only</li>
</ul>

<h3>Not Included</h3>
<p>The following can be arranged separately upon request: accommodation or stay, transportation (early morning arrangements may be required), sound system or additional audio equipment, videography or drone, additional facilitators or ceremonial practitioners, hair and makeup, wedding attire or styling, rehearsals involving all vendors, and any items not explicitly listed under What's Included.</p>

<h3>Weather &amp; Nature Conditions</h3>
<p>Sunrise or purification-led ceremonies often take place in outdoor or water-based environments and are subject to natural conditions. Conditions may include early morning mist or low visibility, sudden weather changes, cooler temperatures, water conditions depending on location, and natural terrain and accessibility.</p>
<p>As these ceremonies are guided by natural timing and environment, conditions are beyond our control. In the event of unfavorable weather, the ceremony may proceed where safely possible, pause briefly to allow conditions to improve, be repositioned to a nearby sheltered area where available, or have symbolic elements simplified or adjusted.</p>
<p>The couple acknowledges that natural conditions are inherent to the experience and are not grounds for cancellation, refund, or rescheduling unless otherwise agreed in writing.</p>

<h3>Payment &amp; Booking Conditions</h3>
<ul>
  <li>A 50% non-refundable deposit is required upon confirmation</li>
  <li>The remaining 50% balance must be paid no later than 30 days prior to the event date</li>
  <li>The event date is not considered secured until the deposit has been received</li>
  <li>All payments made are non-refundable unless otherwise stated in writing</li>
  <li>Failure to complete payment by the agreed deadline may result in cancellation of services without refund</li>
  <li>Any requested changes to ceremony timing, location, or structure after confirmation are subject to availability and may incur additional fees depending on adjustments required</li>
  <li>Venue access and permits (if applicable) follow the respective location's policies</li>
</ul>

<h3>Perfect Timing</h3>
<p>Timing is central to this experience.</p>
<ul>
  <li><strong>Sunrise (Approximately 6:00 – 7:30 AM)</strong> — The most recommended timing. Light is soft, the atmosphere is still, and the environment feels quiet and undisturbed. This creates the most aligned setting for reflection and renewal.</li>
  <li><strong>Early Morning (Up to 9:00 AM)</strong> — Still suitable for calm ceremonies, though light becomes brighter and activity may gradually increase.</li>
</ul>
<p>Sunrise timing is strongly recommended for maximum stillness and privacy, soft diffused natural light, strong emotional atmosphere, and alignment with the symbolic theme of renewal. Final timing will be guided by sunrise timing variation, location accessibility, environmental conditions, and desired emotional tone.</p>`,
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/v1776939445/Sunrise_or_Purification_vfhluk.png",
    gallery: [
      {
        id: "sunrise-purification-elopement-img-1",
        url: "https://res.cloudinary.com/dzerxindp/image/upload/v1776939445/Sunrise_or_Purification_vfhluk.png",
        sort_order: 0,
        theme_id: "sunrise-purification-elopement",
      },
    ],
    venue_id: "",
    venue: getVenue(""),
    experience_id: "3",
    experience: getExp("3"),
  },

  {
    id: "editorial-luxury-elopement",
    slug: "editorial-luxury-elopement",
    type: "ELOPEMENT",
    title: "Editorial yet Human Storytelling",
    description: `<p>At Linda Wiryani Design and Event Planning, we create luxury elopements in Bali that feel like a beautifully curated editorial — yet remain deeply personal and emotionally real. As a Bali elopement planner and designer, our work is rooted in fashion, design, and five-star hospitality. Each celebration is thoughtfully art-directed, balancing refined aesthetics with genuine human connection.</p>

<blockquote><p>Every detail is intentional. Every moment is carefully composed. Yet nothing feels staged or distant. Our approach to Bali elopement weddings is to create an atmosphere that feels effortless and lived-in — elegant, yet warm; visually refined, yet emotionally honest.</p></blockquote>

<p>Each Linda Wiryani Design and Event Planning elopement in Bali is never defined by trends, but by place, emotion, and intention. From private villas in Uluwatu, serene landscapes in Ubud, to hidden coastal settings across Bali — every wedding is thoughtfully curated to feel timeless rather than temporary. Beautiful, composed and always emotionally true.</p>

<h3>Our Elopement Experiences Include</h3>
<ul>
  <li><strong>Editorial or Fashion-Forward Elopements in Bali</strong> — Couture-led elopements designed with a strong visual direction, ideal for couples seeking a refined, editorial-style wedding in Bali.</li>
  <li><strong>Home-Style Intimate Elopements</strong> — Warm and personal gatherings designed around closeness, comfort, and natural flow.</li>
  <li><strong>Quiet Luxury Elopements in Bali</strong> — Understated and sophisticated celebrations where beauty is expressed through tone, texture, and emotion — a signature of modern luxury weddings in Bali.</li>
</ul>

<h3>What's Included</h3>

<h4>Ceremony Design &amp; Coordination</h4>
<ul>
  <li>Wedding ceremony planning and on-the-day coordination (1 pax)</li>
  <li>English-speaking local celebrant</li>
  <li>Custom-designed commemorative wedding certificate</li>
  <li>Venue access coordination (basic access only)</li>
</ul>

<h4>Floral Styling <em>(Refined &amp; Natural Composition)</em></h4>
<ul>
  <li>Ceremony backdrop using locally sourced flowers, greenery, and selected artificial elements</li>
  <li>Floral aisle arrangements with organic, natural movement</li>
  <li>Flower petals along the ceremony walkway</li>
  <li>Bridal bouquet and groom's boutonniere</li>
</ul>

<h4>Music</h4>
<ul>
  <li>Solo guitarist or solo violinist for an intimate, atmospheric ceremony</li>
</ul>

<h4>Photography</h4>
<ul>
  <li>Professional photographer (2 hours, 1 pax)</li>
  <li>Edited, best-selected images</li>
  <li>Delivery within 7 days via private online gallery</li>
</ul>

<h3>Important Notes</h3>
<ul>
  <li>This experience is intentionally curated to remain simple, refined, and focused on the ceremony moment itself</li>
  <li>Only items listed above are included</li>
  <li>All additional elements can be arranged upon request</li>
  <li>Ceremony timing will be confirmed based on natural light, location conditions, and overall environmental flow</li>
  <li>Package rates start from <strong>IDR 35,000,000</strong></li>
  <li>This package is designed for a couple only</li>
</ul>

<h3>Not Included</h3>
<p>Available upon request with additional cost: venue or location fees (if required), accommodation, transportation, sound system or additional audio setup, videography or drone, additional musicians or entertainment, hair and makeup, wedding attire and accessories, and rehearsals with full vendor team.</p>

<h3>Weather &amp; Natural Conditions</h3>
<p>Outdoor and riverside elopements in Bali are influenced by natural elements such as weather, humidity, water flow, and terrain. In the event of rain or changing conditions, the ceremony may pause briefly, adjustments may be made to positioning or setup, and styling may be refined to ensure safety and cohesion. No fixed indoor backup is guaranteed unless provided by the venue. These natural conditions are part of the experience and are not considered grounds for cancellation or refund.</p>

<h3>Payment &amp; Booking</h3>
<ul>
  <li>A 50% non-refundable deposit is required upon confirmation</li>
  <li>The remaining 50% balance is due 30 days prior to the event</li>
  <li>The date is only secured once the deposit is received</li>
  <li>All payments are non-refundable unless otherwise agreed in writing</li>
  <li>Changes to date, venue, or design after confirmation are subject to availability and may incur additional costs</li>
</ul>

<h3>Perfect Timing</h3>
<p>Elopements are designed around natural light and environmental harmony.</p>
<ul>
  <li><strong>Morning (7:00 – 9:00 AM)</strong> — Soft light, cooler temperature, and a calm, quiet atmosphere.</li>
  <li><strong>Late Afternoon (4:30 – 6:00 PM)</strong> — Warm tones, softer shadows, and a more atmospheric setting.</li>
</ul>
<p>Final timing will be guided by light direction, weather patterns, location conditions, and overall comfort and safety.</p>`,
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/v1776939444/Editorial_yet_human_storytelling_xnjqzv.png",
    gallery: [
      {
        id: "editorial-luxury-elopement-img-1",
        url: "https://res.cloudinary.com/dzerxindp/image/upload/v1776939444/Editorial_yet_human_storytelling_xnjqzv.png",
        sort_order: 0,
        theme_id: "editorial-luxury-elopement",
      },
    ],
    venue_id: "",
    venue: getVenue(""),
    experience_id: "3",
    experience: getExp("3"),
  },

  // ─── INTIMATE THEMES ──────────────────────────────────────────────────────

  {
    id: "private-villa-estate",
    slug: "private-villa-estate",
    type: "INTIMATE",
    title: "Private Villa Estate Weddings",
    description: `<p>Host your closest loved ones in an exclusive villa estate featuring stunning architecture and manicured gardens. Private Villa Estate Weddings are crafted for couples who desire a refined, unhurried celebration entirely their own — where every detail of the space works in harmony with the ceremony.</p>

<p>These settings offer complete privacy, bespoke styling possibilities, and an atmosphere shaped by the architecture and landscape of the estate itself. Whether nestled within tropical gardens or set against sweeping views, each villa becomes a living backdrop for your most important day.</p>`,
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/v1768446142/Wedding_1_fyzchu.jpg",
    gallery: [
      {
        id: "private-villa-estate-img-1",
        url: "https://res.cloudinary.com/dzerxindp/image/upload/v1768446142/Wedding_1_fyzchu.jpg",
        sort_order: 0,
        theme_id: "private-villa-estate",
      },
      {
        id: "private-villa-estate-img-2",
        url: "https://res.cloudinary.com/dzerxindp/image/upload/v1768446128/Wedding_2_pbz9so.jpg",
        sort_order: 1,
        theme_id: "private-villa-estate",
      },
      {
        id: "private-villa-estate-img-3",
        url: "https://res.cloudinary.com/dzerxindp/image/upload/v1768446105/Lifestyle_1_rka2va.jpg",
        sort_order: 2,
        theme_id: "private-villa-estate",
      },
      {
        id: "private-villa-estate-img-4",
        url: "https://res.cloudinary.com/dzerxindp/image/upload/v1768446105/Lifestyle_2_iplagw.jpg",
        sort_order: 3,
        theme_id: "private-villa-estate",
      },
      {
        id: "private-villa-estate-img-5",
        url: "https://res.cloudinary.com/dzerxindp/image/upload/v1768446107/Lifestyle_5_nhlcqw.jpg",
        sort_order: 4,
        theme_id: "private-villa-estate",
      },
    ],
    venue_id: "10",
    venue: getVenue("10"),
    experience_id: "2",
    experience: getExp("2"),
  },
  {
    id: "luxury-resort-intimate",
    slug: "luxury-resort-intimate",
    type: "INTIMATE",
    title: "Luxury Resort Intimate Weddings",
    description: `<p>Experience world-class hospitality and breathtaking venues within prestigious resort properties. Luxury Resort Intimate Weddings are designed for couples who want the ease and refinement of a world-class setting — without the scale of a large event.</p>

<p>These celebrations are held within carefully selected resort properties that offer dedicated wedding facilities, professional event staff, and elevated catering. From beachfront pavilions to clifftop terraces, each venue brings its own distinct character to your celebration.</p>`,
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/v1767878596/BAL_1453_e7hd8w.jpg",
    gallery: [
      {
        id: "luxury-resort-intimate-img-1",
        url: "https://res.cloudinary.com/dzerxindp/image/upload/v1767878596/BAL_1453_e7hd8w.jpg",
        sort_order: 0,
        theme_id: "luxury-resort-intimate",
      },
      {
        id: "luxury-resort-intimate-img-2",
        url: "https://res.cloudinary.com/dzerxindp/image/upload/v1767878580/BAL_1451_dhfxcj.jpg",
        sort_order: 1,
        theme_id: "luxury-resort-intimate",
      },
      {
        id: "luxury-resort-intimate-img-3",
        url: "https://res.cloudinary.com/dzerxindp/image/upload/v1767878569/BAL_1210_gktw4p.jpg",
        sort_order: 2,
        theme_id: "luxury-resort-intimate",
      },
      {
        id: "luxury-resort-intimate-img-4",
        url: "https://res.cloudinary.com/dzerxindp/image/upload/v1767878582/BAL_1330_screen-hi-res_dym0xt.jpg",
        sort_order: 3,
        theme_id: "luxury-resort-intimate",
      },
      {
        id: "luxury-resort-intimate-img-5",
        url: "https://res.cloudinary.com/dzerxindp/image/upload/v1767878565/BAL_1338_screen-hi-res_hf0l9e.jpg",
        sort_order: 4,
        theme_id: "luxury-resort-intimate",
      },
      {
        id: "luxury-resort-intimate-img-6",
        url: "https://res.cloudinary.com/dzerxindp/image/upload/v1767878570/BAL_1429_vf3mvt.jpg",
        sort_order: 5,
        theme_id: "luxury-resort-intimate",
      },
    ],
    venue_id: "23",
    venue: getVenue("23"),
    experience_id: "2",
    experience: getExp("2"),
  },
  {
    id: "garden-riverside",
    slug: "garden-riverside",
    type: "INTIMATE",
    title: "Garden & Riverside Weddings",
    description: `<p>Celebrate amidst blooming florals and flowing waters in serene natural garden settings. Garden &amp; Riverside Weddings embrace the gentle rhythms of the natural world — where the sound of water, the softness of greenery, and open sky come together to hold your ceremony in quiet, organic beauty.</p>

<p>These celebrations are shaped by the landscape itself. Lush riverside lawns, flowering garden terraces, and open-air pavilions provide a setting that feels both effortlessly romantic and grounded in nature.</p>`,
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/v1769608324/Wedding_3_demaoq.png",
    gallery: [
      {
        id: "garden-riverside-img-1",
        url: "https://res.cloudinary.com/dzerxindp/image/upload/v1769608324/Wedding_3_demaoq.png",
        sort_order: 0,
        theme_id: "garden-riverside",
      },
      {
        id: "garden-riverside-img-2",
        url: "https://res.cloudinary.com/dzerxindp/image/upload/v1769608323/Wedding_1_zgtm4d.png",
        sort_order: 1,
        theme_id: "garden-riverside",
      },
      {
        id: "garden-riverside-img-3",
        url: "https://res.cloudinary.com/dzerxindp/image/upload/v1769608331/Wedding_2_sxvamv.png",
        sort_order: 2,
        theme_id: "garden-riverside",
      },
      {
        id: "garden-riverside-img-4",
        url: "https://res.cloudinary.com/dzerxindp/image/upload/v1769608324/Wedding_4_wynsx3.png",
        sort_order: 3,
        theme_id: "garden-riverside",
      },
    ],
    venue_id: "30",
    venue: getVenue("30"),
    experience_id: "2",
    experience: getExp("2"),
  },
  {
    id: "cultural-architectural",
    slug: "cultural-architectural",
    type: "INTIMATE",
    title: "Cultural & Architectural Settings",
    description: `<p>Honor tradition in venues that showcase Bali's rich cultural heritage and stunning architecture. Cultural &amp; Architectural Settings are designed for couples who feel drawn to the depth of place — celebrations held within temple courtyards, heritage estates, and venues where Balinese artistry and spatial design carry their own quiet ceremony.</p>

<p>These weddings are shaped as much by the venue's character as by the couple's own vision. Ceremonial elements are woven carefully into the setting, creating a celebration that feels rooted, meaningful, and visually extraordinary.</p>`,
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/v1769236708/Wedding_5_ucfdpj.jpg",
    gallery: [
      {
        id: "cultural-architectural-img-1",
        url: "https://res.cloudinary.com/dzerxindp/image/upload/v1769236708/Wedding_5_ucfdpj.jpg",
        sort_order: 0,
        theme_id: "cultural-architectural",
      },
      {
        id: "cultural-architectural-img-2",
        url: "https://res.cloudinary.com/dzerxindp/image/upload/v1769236705/Wedding_3_pnefn2.jpg",
        sort_order: 1,
        theme_id: "cultural-architectural",
      },
      {
        id: "cultural-architectural-img-3",
        url: "https://res.cloudinary.com/dzerxindp/image/upload/v1769236703/Wedding_2_u5yqq8.jpg",
        sort_order: 2,
        theme_id: "cultural-architectural",
      },
      {
        id: "cultural-architectural-img-4",
        url: "https://res.cloudinary.com/dzerxindp/image/upload/v1769236704/Wedding_1_t2ksqq.jpg",
        sort_order: 3,
        theme_id: "cultural-architectural",
      },
      {
        id: "cultural-architectural-img-5",
        url: "https://res.cloudinary.com/dzerxindp/image/upload/v1769236705/Wedding_4_bssvtq.jpg",
        sort_order: 4,
        theme_id: "cultural-architectural",
      },
      {
        id: "cultural-architectural-img-6",
        url: "https://res.cloudinary.com/dzerxindp/image/upload/v1769236708/Wedding_6_otcjrs.jpg",
        sort_order: 5,
        theme_id: "cultural-architectural",
      },
      {
        id: "cultural-architectural-img-7",
        url: "https://res.cloudinary.com/dzerxindp/image/upload/v1769236705/Wedding_7_nnurto.jpg",
        sort_order: 6,
        theme_id: "cultural-architectural",
      },
    ],
    venue_id: "19",
    venue: getVenue("19"),
    experience_id: "2",
    experience: getExp("2"),
  },
  {
    id: "destination-intimate",
    slug: "destination-intimate",
    type: "INTIMATE",
    title: "Destination Intimate Celebrations",
    description: `<p>Create unforgettable memories in unique destination venues that perfectly frame your love story. Destination Intimate Celebrations are designed for couples who choose to travel — to celebrate in a place that holds meaning, beauty, and a sense of arrival.</p>

<p>These weddings are held in venues selected for their panoramic setting, distinctive character, and the feeling they create upon arrival. Whether perched above the ocean, nestled within terraced rice fields, or overlooking a volcanic crater, each location becomes an essential part of the story.</p>`,
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/v1767511823/Wedding_2_byu1us.jpg",
    gallery: [
      {
        id: "destination-intimate-img-1",
        url: "https://res.cloudinary.com/dzerxindp/image/upload/v1767511823/Wedding_2_byu1us.jpg",
        sort_order: 0,
        theme_id: "destination-intimate",
      },
      {
        id: "destination-intimate-img-2",
        url: "https://res.cloudinary.com/dzerxindp/image/upload/v1767511815/Wedding_1_nlta08.jpg",
        sort_order: 1,
        theme_id: "destination-intimate",
      },
      {
        id: "destination-intimate-img-3",
        url: "https://res.cloudinary.com/dzerxindp/image/upload/v1767511826/Wedding_3_risbjp.jpg",
        sort_order: 2,
        theme_id: "destination-intimate",
      },
      {
        id: "destination-intimate-img-4",
        url: "https://res.cloudinary.com/dzerxindp/image/upload/v1767511813/Wedding_4_c98b0e.jpg",
        sort_order: 3,
        theme_id: "destination-intimate",
      },
      {
        id: "destination-intimate-img-5",
        url: "https://res.cloudinary.com/dzerxindp/image/upload/v1767511820/Wedding_5_sersgy.jpg",
        sort_order: 4,
        theme_id: "destination-intimate",
      },
      {
        id: "destination-intimate-img-6",
        url: "https://res.cloudinary.com/dzerxindp/image/upload/v1767511811/Wedding_6_uyayfs.jpg",
        sort_order: 5,
        theme_id: "destination-intimate",
      },
      {
        id: "destination-intimate-img-7",
        url: "https://res.cloudinary.com/dzerxindp/image/upload/v1767511818/Wedding_7_f0vgit.jpg",
        sort_order: 6,
        theme_id: "destination-intimate",
      },
    ],
    venue_id: "22",
    venue: getVenue("22"),
    experience_id: "2",
    experience: getExp("2"),
  },
  {
    id: "forest-jungle-intimate",
    slug: "forest-jungle-intimate",
    type: "INTIMATE",
    title: "Intimate Jungle or Forest Weddings",
    description: `<p>Celebrate your union beneath ancient trees in an enchanting natural cathedral of green. Intimate Jungle or Forest Weddings are held within Bali's lush interior landscapes — where towering canopies, filtered light, and the quiet presence of nature form a setting unlike any other.</p>

<p>These ceremonies embrace the untamed beauty of the forest environment. The rustling of leaves, dappled sunlight through the canopy, and the surrounding greenery create an atmosphere that feels primal, poetic, and profoundly alive.</p>`,
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/v1769609440/Cover_1_py4g8y.jpg",
    gallery: [
      {
        id: "forest-jungle-intimate-img-1",
        url: "https://res.cloudinary.com/dzerxindp/image/upload/v1769609440/Cover_1_py4g8y.jpg",
        sort_order: 0,
        theme_id: "forest-jungle-intimate",
      },
    ],
    venue_id: "31",
    venue: getVenue("31"),
    experience_id: "2",
    experience: getExp("2"),
  },
];
