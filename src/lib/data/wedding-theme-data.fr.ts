// ─── HELPERS ──────────────────────────────────────────────────────────────────

import { WeddingTheme } from "@/types";
import { venueList } from "./venue-data.fr";
import { weddingExperienceList } from "./wedding-experience-data.fr";

const getVenue = (id: string) => venueList.find((v) => v.id === id)!;
const getExp = (id: string) => weddingExperienceList.find((e) => e.id === id)!;

// ─── THEME LIST ───────────────────────────────────────────────────────────────

export const weddingThemeList: WeddingTheme[] = [
  // ─── ELOPEMENT THEMES ─────────────────────────────────────────────────────

  {
    id: "private-villa-elopement",
    slug: "private-villa-elopement",
    type: "ELOPEMENT",
    title: "Elopements en Villa Privée",
    description: `<p>Les Elopements en Villa Privée sont conçus pour les couples qui privilégient l'intimité, le calme et un cadre profondément personnel. Au sein de villas privées soigneusement sélectionnées, ces célébrations sont guidées par l'architecture, le paysage et la fluidité naturelle des lieux, pour créer une atmosphère intime, sans précipitation et délibérément raffinée.</p>

<p>Linda Wiryani Design and Event Planning travaille avec une sélection de magnifiques villas privées idéales pour des elopements intimes. Les couples peuvent également choisir de célébrer dans une villa qu'ils ont réservée eux-mêmes, sous réserve de convenance et des règles du lieu.</p>

<blockquote><p>Cette cérémonie n'est pas conçue pour impressionner par l'excès, mais pour émouvoir par la clarté, l'équilibre et l'intention. Un échange de vœux discret. Un cadre pensé avec soin. Et un moment profondément personnel et intemporel.</p></blockquote>

<h3>Ce qui est inclus</h3>

<h4>Conception et coordination de la cérémonie</h4>
<ul>
  <li>Planification de la cérémonie de mariage et coordination le jour J par Linda Wiryani Design &amp; Event Planning (1 personne)</li>
  <li>Célébrant local parlant anglais</li>
  <li>Certificat de mariage commémoratif conçu sur mesure, en souvenir</li>
</ul>

<h4>Décoration florale <em>(Fleurs locales | Raffinée et élégante)</em></h4>
<ul>
  <li>Fond de cérémonie composé d'un mélange harmonieux de fleurs fraîches d'origine locale, de verdure naturelle et de quelques éléments artificiels choisis, savamment agencés pour s'accorder avec l'environnement de la villa privée</li>
  <li>Pétales de fleurs le long de l'allée de la cérémonie</li>
  <li>Compositions florales d'allée conçues pour paraître naturelles et sobres</li>
  <li>Bouquet de la mariée en fleurs locales</li>
  <li>Boutonnière du marié, assortie à la palette florale</li>
</ul>

<h4>Musique</h4>
<ul>
  <li>Guitariste solo ou violoniste solo pour une musique de cérémonie discrète et pleine d'atmosphère</li>
</ul>

<h4>Photographie</h4>
<ul>
  <li>Photographe professionnel pendant 1,5 heure (1 personne)</li>
  <li>Sélection des meilleures images, soigneusement choisies et retouchées</li>
  <li>Livraison des images finales sous 1 semaine via un lien Google Drive privé</li>
</ul>

<h3>Horaire de la cérémonie</h3>
<p>Les Elopements en Villa Privée se vivent au mieux durant deux plages de lumière naturelle, lorsque l'atmosphère de la villa est la plus sereine et la plus équilibrée.</p>
<ul>
  <li><strong>Matin (environ 7 h 00 – 9 h 00)</strong> — Les cérémonies du matin offrent une lumière douce et diffuse ainsi qu'une atmosphère paisible avant que la journée ne s'anime pleinement. L'air est généralement plus frais, l'environnement plus calme, et la lumière naturelle souligne délicatement les lignes architecturales et les paysages alentour. Cet horaire est intime, frais et sans précipitation.</li>
  <li><strong>Coucher de soleil (environ 17 h 00 – 18 h 30)</strong> — Les cérémonies au coucher du soleil créent une ambiance chaude et dorée, lorsque la lumière traverse l'architecture de la villa et la verdure environnante. La transition progressive du jour vers la soirée ajoute de la profondeur et du romantisme, pour un cadre raffiné et plein d'atmosphère.</li>
</ul>
<p>L'horaire définitif de la cérémonie sera confirmé en fonction de l'orientation architecturale de la villa, de la direction de la lumière naturelle et du mouvement des ombres, des variations saisonnières du coucher du soleil, ainsi que de la fluidité des espaces et de l'atmosphère générale. Les cérémonies du matin offrent souvent plus de flexibilité et des conditions plus calmes, tandis que le coucher du soleil apporte une chaleur tonale et une profondeur visuelle plus riches. L'horaire retenu sera toujours guidé par la lumière, l'harmonie des espaces et l'intention esthétique globale de la cérémonie.</p>

<h3>Notes importantes</h3>
<ul>
  <li>Ce forfait est volontairement conçu pour rester simple, élégant et centré sur le moment de la cérémonie lui-même</li>
  <li>Seuls les éléments listés ci-dessus sont inclus</li>
  <li>Ce forfait est conçu pour un couple uniquement</li>
  <li>L'horaire de la cérémonie sera confirmé une fois la villa privée choisie, en tenant compte de la lumière naturelle, de l'atmosphère et de l'agencement de la villa afin d'offrir le cadre le plus serein possible</li>
  <li>Les tarifs d'hébergement en villa ne sont pas inclus et seront ajoutés sur demande</li>
  <li>Tarifs du forfait à partir de <strong>25 000 000 IDR</strong></li>
</ul>

<h3>Météo et conditions naturelles</h3>
<p>Les Elopements en Villa Privée se déroulent dans des espaces de villa en plein air ou semi-ouverts, naturellement soumis au climat tropical de Bali. Si les villas privées offrent une meilleure protection structurelle que des cadres entièrement en extérieur, les conditions météorologiques telles que la pluie, l'humidité, le vent ou les averses tropicales soudaines restent hors de notre contrôle.</p>
<p>En cas de pluie, il n'existe pas de solution de repli extérieure fixe. La cérémonie peut être brièvement suspendue le temps que la météo se stabilise, ou déplacée avec soin vers un espace couvert ou intérieur de la villa, selon l'horaire, l'agencement des lieux et l'accessibilité. L'emplacement du décor peut être ajusté lorsque le temps le permet raisonnablement, afin de préserver l'harmonie avec la fluidité architecturale de la villa.</p>
<p>Le couple reconnaît que les conditions météorologiques font partie de l'environnement naturel de Bali et ne constituent pas un motif d'annulation, de remboursement ou de report, sauf accord contraire écrit. Linda Wiryani Design &amp; Event Planning donnera toujours la priorité à la sécurité, au confort et à l'intégrité esthétique, dans les limites du temps, du lieu et des conditions météorologiques.</p>

<h3>Conditions de paiement et de réservation</h3>
<ul>
  <li>Un acompte non remboursable de 50 % est exigé à la confirmation de la réservation</li>
  <li>Le solde de 50 % est dû au plus tard 30 jours avant la date de l'événement</li>
  <li>La date de l'événement n'est pas considérée comme réservée tant que l'acompte n'a pas été reçu</li>
  <li>Tous les paiements effectués sont non remboursables, sauf mention contraire écrite</li>
  <li>Le défaut de paiement du solde dans le délai convenu peut entraîner l'annulation des services sans remboursement de l'acompte initial</li>
  <li>Si le couple choisit de modifier la date, le lieu ou les éléments clés de la cérémonie après confirmation, toute modification reste soumise aux disponibilités et peut entraîner des frais supplémentaires</li>
  <li>La location de la villa et les frais d'hébergement (le cas échéant) sont distincts de ce forfait de cérémonie et suivent les conditions de paiement et d'annulation propres à chaque villa</li>
</ul>

<h3>Non inclus</h3>
<p>Les éléments suivants peuvent être organisés séparément sur demande : frais de lieu ou d'événement (le cas échéant), hébergement ou séjour en villa, transport, système de sonorisation ou équipement audio, vidéographie ou drone, musiciens supplémentaires ou animation en direct, coiffure et maquillage, robe de mariée, costumes ou accessoires, répétitions impliquant l'ensemble des prestataires, ainsi que tout élément non expressément mentionné sous « Ce qui est inclus ».</p>`,
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/v1776940317/Private_Villa_Elopement_Mutiara_6_etnh26.png",
    gallery: [
      {
        id: "private-villa-elopement-img-1",
        url: "https://res.cloudinary.com/dzerxindp/image/upload/v1776940317/Private_Villa_Elopement_Mutiara_6_etnh26.png",
        sort_order: 0,
        theme_id: "private-villa-elopement",
      },
      {
        id: "private-villa-elopement-img-2",
        url: "https://res.cloudinary.com/dzerxindp/image/upload/v1776940317/Private_Villa_Elopement_Vivara1_wqecfn.png",
        sort_order: 1,
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
    title: "Elopements en Bord de Falaise",
    description: `<p>Les Elopements en Bord de Falaise sont conçus pour les couples attirés par les horizons ouverts, l'élévation spectaculaire et la force tranquille de la mer. Situées le long des falaises côtières de Bali, ces célébrations sont façonnées par la lumière, le vent et les vues étendues, pour une atmosphère à la fois intime et impressionnante.</p>

<p>Linda Wiryani Design and Event Planning travaille avec une sélection de magnifiques lieux en bord de falaise et de domaines privés adaptés aux elopements intimes. Le choix du lieu est guidé par l'accessibilité, la sécurité et l'harmonie d'ensemble du design.</p>

<blockquote><p>Cette cérémonie n'est pas conçue pour impressionner par l'excès, mais pour émouvoir par la clarté, l'équilibre et l'intention. Un échange de vœux discret. Un horizon sans fin. Et un moment à la fois intime et vaste.</p></blockquote>

<h3>Ce qui est inclus</h3>

<h4>Conception et coordination de la cérémonie</h4>
<ul>
  <li>Planification de la cérémonie de mariage et coordination le jour J par Linda Wiryani Design &amp; Event Planning (1 personne)</li>
  <li>Célébrant local parlant anglais</li>
  <li>Certificat de mariage commémoratif conçu sur mesure, en souvenir</li>
  <li>Frais d'accès au lieu inclus</li>
</ul>

<h4>Décoration florale <em>(Fleurs locales | Raffinée et élégante)</em></h4>
<ul>
  <li>Fond de cérémonie composé d'un mélange harmonieux de fleurs fraîches d'origine locale, de verdure naturelle et de quelques éléments artificiels choisis, savamment agencés pour s'accorder avec l'environnement de la falaise</li>
  <li>Pétales de fleurs le long de l'allée de la cérémonie</li>
  <li>Compositions florales d'allée conçues pour paraître naturelles tout en restant structurées face au paysage côtier</li>
  <li>Bouquet de la mariée en fleurs locales</li>
  <li>Boutonnière du marié assortie à l'ensemble de la palette florale</li>
</ul>

<h4>Musique</h4>
<ul>
  <li>Guitariste solo ou violoniste solo pour une musique de cérémonie discrète et pleine d'atmosphère</li>
</ul>

<h4>Photographie</h4>
<ul>
  <li>Photographe professionnel pendant 1,5 heure (1 personne)</li>
  <li>Sélection des meilleures images, soigneusement choisies et retouchées</li>
  <li>Livraison des images finales sous 1 semaine via un lien Google Drive privé</li>
</ul>

<h3>Horaire de la cérémonie</h3>
<p>Les Elopements en Bord de Falaise se vivent au mieux durant deux plages de lumière naturelle :</p>
<ul>
  <li><strong>Matin (environ 7 h 00 – 9 h 00)</strong> — Les cérémonies du matin offrent un vent plus doux, un ciel plus dégagé et une lumière naturelle délicate. L'atmosphère est calme, intime et sereine, avec moins de visiteurs et un environnement côtier plus paisible.</li>
  <li><strong>Coucher de soleil (environ 17 h 00 – 18 h 30)</strong> — Les cérémonies au coucher du soleil offrent une lumière dorée spectaculaire, des tons d'horizon étendus et une atmosphère naturellement cinématographique. Le ciel change progressivement de couleur, offrant un décor puissant et chargé d'émotion face à l'océan et aux falaises.</li>
</ul>
<p>L'horaire définitif de la cérémonie sera confirmé en fonction des variations saisonnières du coucher du soleil, des conditions de vent, de l'accessibilité et de la réglementation du lieu, ainsi que de la sécurité et du confort général. Si le coucher du soleil offre un spectacle visuel, il peut aussi s'accompagner de vents côtiers plus forts. Les cérémonies du matin sont généralement plus stables sur le plan météorologique. L'horaire choisi sera toujours guidé par la lumière naturelle, les considérations de sécurité et l'intention esthétique globale de la cérémonie.</p>

<h3>Notes importantes</h3>
<ul>
  <li>Ce forfait est volontairement conçu pour rester simple, élégant et centré sur le moment de la cérémonie lui-même</li>
  <li>Seuls les éléments listés ci-dessus sont inclus</li>
  <li>Ce forfait est conçu pour un couple uniquement</li>
  <li>L'horaire de la cérémonie sera confirmé une fois le lieu choisi, en tenant compte de la lumière naturelle, des conditions de marée et de l'atmosphère générale</li>
  <li>Tarifs du forfait à partir de <strong>25 000 000 IDR</strong></li>
</ul>

<h3>Météo et conditions naturelles</h3>
<p>Les Elopements en Bord de Falaise se déroulent dans des environnements côtiers naturellement exposés, où le vent, l'air marin et les changements de météo font partie intégrante du cadre. Les falaises sont particulièrement soumises à des rafales de vent fortes ou soudaines, à la chaleur et à l'exposition directe au soleil, à des pluies tropicales soudaines et à l'évolution des conditions côtières.</p>
<p>En cas de pluie ou de vent fort, il n'existe pas de solution de repli extérieure fixe. La cérémonie peut être brièvement suspendue le temps que les conditions se stabilisent. Si le lieu dispose d'un espace intérieur ou couvert, la cérémonie peut être déplacée avec soin, sous réserve de disponibilité et d'horaire. Les structures florales et les installations décoratives peuvent être ajustées, sécurisées, simplifiées ou repositionnées afin de garantir la sécurité tout en préservant l'intégrité esthétique d'ensemble.</p>
<p>La sécurité reste la priorité absolue. Si les conditions sont jugées dangereuses par le Planner ou la direction du lieu, les ajustements nécessaires seront effectués en conséquence. Le couple reconnaît que la météo et le vent côtier sont des éléments naturels d'un environnement de falaise et ne constituent pas un motif d'annulation, de remboursement ou de report, sauf accord contraire écrit.</p>

<h3>Conditions de paiement et de réservation</h3>
<ul>
  <li>Un acompte non remboursable de 50 % est exigé à la confirmation</li>
  <li>Le solde de 50 % doit être réglé au plus tard 30 jours avant la date de l'événement</li>
  <li>La date n'est pas réservée tant que l'acompte n'a pas été reçu</li>
  <li>Tous les paiements effectués sont non remboursables, sauf mention contraire écrite</li>
  <li>Le défaut de paiement du solde dans le délai convenu peut entraîner l'annulation des services sans remboursement de l'acompte</li>
  <li>Si le couple demande des modifications du lieu, de la date de la cérémonie, de l'horaire ou d'éléments clés après confirmation, toutes les modifications sont soumises aux disponibilités et des frais supplémentaires peuvent s'appliquer selon les ajustements logistiques, le report des prestataires ou la politique du lieu</li>
  <li>La location du lieu et les frais d'hébergement (le cas échéant) suivent les conditions de paiement et d'annulation propres à chaque lieu et sont distincts de ce forfait, sauf mention explicite contraire</li>
</ul>

<h3>Non inclus</h3>
<p>Les éléments suivants peuvent être organisés séparément sur demande : frais de lieu ou d'événement (le cas échéant), hébergement ou séjour, transport, système de sonorisation ou équipement audio supplémentaire, vidéographie ou drone, musiciens supplémentaires ou animation en direct, coiffure et maquillage, robe de mariée, costumes ou accessoires, répétitions impliquant l'ensemble des prestataires, ainsi que tout élément non expressément mentionné sous « Ce qui est inclus ».</p>`,
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
    title: "Elopements Architecturaux et Tropicaux Modernes",
    description: `<p>Les Elopements Architecturaux et Tropicaux Modernes sont conçus pour les couples attirés par les lignes épurées, les matériaux naturels et les espaces au fort caractère visuel. Dans des lieux pensés avec soin, des villas tropicales modernes aux domaines signés d'architectes, ces célébrations sont guidées par les proportions, la lumière, les textures et la fluidité des espaces.</p>

<p>Ici, l'architecture n'est pas qu'un simple décor. Elle façonne le rythme de la cérémonie et encadre chaque instant avec clarté et intention.</p>

<p>Linda Wiryani Design and Event Planning travaille avec une sélection de lieux résolument tournés vers le design, où la structure, la matérialité et le paysage coexistent en une harmonie discrète. Le choix du lieu est guidé par l'intégrité architecturale, l'intimité et la cohérence esthétique.</p>

<blockquote><p>Cette cérémonie n'est pas conçue pour impressionner par l'excès, mais pour émouvoir par la structure, la retenue et l'intention. Des lignes épurées. Des textures naturelles. Et un moment encadré par un design réfléchi.</p></blockquote>

<h3>Ce qui est inclus</h3>

<h4>Conception et coordination de la cérémonie</h4>
<ul>
  <li>Planification de la cérémonie de mariage et coordination le jour J par Linda Wiryani Design &amp; Event Planning (1 personne)</li>
  <li>Célébrant local parlant anglais</li>
  <li>Certificat de mariage commémoratif conçu sur mesure, en souvenir</li>
</ul>

<h4>Décoration florale <em>(Fleurs locales | Raffinée et élégante)</em></h4>
<ul>
  <li>Fond de cérémonie composé d'un mélange harmonieux de fleurs fraîches d'origine locale, de verdure naturelle et de quelques éléments artificiels choisis, savamment agencés pour s'accorder avec l'environnement architectural et tropical moderne</li>
  <li>Pétales de fleurs le long de l'allée de la cérémonie</li>
  <li>Compositions florales d'allée conçues pour épouser les lignes structurelles et les matériaux naturels du lieu</li>
  <li>Bouquet de la mariée en fleurs locales</li>
  <li>Boutonnière du marié assortie à l'ensemble de la palette florale</li>
</ul>

<h4>Musique</h4>
<ul>
  <li>Guitariste solo ou violoniste solo pour une musique de cérémonie discrète et pleine d'atmosphère</li>
</ul>

<h4>Photographie</h4>
<ul>
  <li>Photographe professionnel pendant 1,5 heure (1 personne)</li>
  <li>Sélection des meilleures images, soigneusement choisies et retouchées</li>
  <li>Livraison des images finales sous 1 semaine via un lien Google Drive privé</li>
</ul>

<h3>Horaire de la cérémonie</h3>
<p>Les Elopements Architecturaux et Tropicaux Modernes se vivent au mieux :</p>
<ul>
  <li><strong>Matin (environ 7 h 00 – 9 h 00)</strong> — Une lumière douce souligne les lignes architecturales et les textures des matériaux. L'atmosphère est calme, aérienne et spatialement équilibrée.</li>
  <li><strong>Coucher de soleil (environ 17 h 00 – 18 h 30)</strong> — La lumière dorée dialogue avec les formes structurelles, créant de la profondeur, des jeux d'ombres et une ambiance cinématographique raffinée.</li>
</ul>
<p>L'horaire définitif sera guidé par l'orientation du bâtiment, le déplacement de la lumière et la composition des espaces afin d'assurer l'harmonie visuelle.</p>

<h3>Notes importantes</h3>
<ul>
  <li>Ce forfait est volontairement conçu pour rester simple, élégant et centré sur le moment de la cérémonie lui-même</li>
  <li>Seuls les éléments listés ci-dessus sont inclus</li>
  <li>Ce forfait est conçu pour un couple uniquement</li>
  <li>L'horaire de la cérémonie sera confirmé une fois le lieu choisi, en tenant compte de la lumière naturelle, des ombres architecturales et de la composition d'ensemble des espaces</li>
  <li>Tarifs du forfait à partir de <strong>25 000 000 IDR</strong></li>
</ul>

<h3>Météo et conditions naturelles</h3>
<p>Bien que ces cérémonies se déroulent dans des environnements architecturaux, la plupart des espaces tropicaux modernes de Bali sont semi-ouverts, naturellement ventilés ou partiellement exposés aux éléments. Les facteurs météorologiques peuvent inclure des pluies tropicales soudaines, l'humidité et la chaleur, les courants d'air à travers les structures ouvertes et l'évolution de la lumière naturelle.</p>
<p>En cas de pluie ou de conditions météorologiques difficiles, aucune solution de repli extérieure fixe n'est garantie, sauf si elle est proposée par le lieu. La cérémonie peut être brièvement suspendue le temps que les conditions se stabilisent, ou déplacée vers un espace architectural couvert ou intérieur de la propriété, selon l'agencement et les disponibilités. Les structures florales et les éléments décoratifs peuvent être simplifiés, sécurisés ou repositionnés afin de garantir la sécurité et la cohérence esthétique.</p>
<p>Ces cadres embrassant volontairement l'architecture tropicale, le couple reconnaît que les éléments naturels font partie de l'expérience et ne constituent pas un motif d'annulation, de remboursement ou de report, sauf accord contraire écrit. La sécurité, l'adéquation structurelle et la réglementation du lieu guideront toujours les décisions finales.</p>

<h3>Conditions de paiement et de réservation</h3>
<ul>
  <li>Un acompte non remboursable de 50 % est exigé à la confirmation de la réservation</li>
  <li>Le solde de 50 % doit être réglé au plus tard 30 jours avant la date de l'événement</li>
  <li>La date de l'événement n'est pas réservée tant que l'acompte n'a pas été reçu</li>
  <li>Tous les paiements effectués sont non remboursables, sauf mention contraire écrite</li>
  <li>Le défaut de paiement du solde dans le délai convenu peut entraîner l'annulation des services sans remboursement de l'acompte</li>
  <li>Toute modification demandée après confirmation — y compris le lieu, la date de la cérémonie, les éléments de décoration ou la logistique clé — est soumise aux disponibilités et peut entraîner des frais supplémentaires selon les ajustements des prestataires ou la politique du lieu</li>
  <li>Les frais de location du lieu, l'hébergement et les cautions propres à la propriété (le cas échéant) suivent les conditions de chaque lieu et sont distincts de ce forfait de cérémonie, sauf mention explicite contraire</li>
</ul>

<h3>Non inclus</h3>
<p>Les éléments suivants peuvent être organisés séparément sur demande : frais de lieu ou d'événement (le cas échéant), hébergement ou séjour, transport, système de sonorisation ou équipement audio supplémentaire, vidéographie ou drone, musiciens supplémentaires ou animation en direct, coiffure et maquillage, robe de mariée, costumes ou accessoires, répétitions impliquant l'ensemble des prestataires, ainsi que tout élément non expressément mentionné sous « Ce qui est inclus ».</p>`,
    image:
      "https://res.cloudinary.com/dzerxindp/image/upload/v1776939440/Architectural_Modern_Tropical_Elopements_nlnd5r.jpg",
    gallery: [
      {
        id: "architectural-modern-tropical-elopement-img-1",
        url: "https://res.cloudinary.com/dzerxindp/image/upload/v1776939440/Architectural_Modern_Tropical_Elopements_nlnd5r.jpg",
        sort_order: 0,
        theme_id: "architectural-modern-tropical-elopement",
      },
      {
        id: "architectural-modern-tropical-elopement-img-1",
        url: "https://res.cloudinary.com/dzerxindp/image/upload/v1777015076/architectural-2_gafx5l.jpg",
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
    title: "Elopements en Forêt et en Jungle",
    description: `<p>Les Elopements en Forêt et en Jungle sont conçus pour les couples attirés par la végétation luxuriante, la lumière filtrée et une profonde immersion dans la nature. Au cœur de forêts tropicales et de paysages de jungle, ces célébrations sont guidées par le rythme de la terre, le feuillage en strates, les textures naturelles et des instants de calme.</p>

<p>Ici, la nature n'est ni recouverte ni remodelée. Elle donne le ton, le rythme et l'atmosphère émotionnelle de la cérémonie.</p>

<p>Linda Wiryani Design and Event Planning travaille avec une sélection de sanctuaires forestiers, de clairières de jungle et de lieux intégrés à la nature, où paysage, lumière et design coexistent en équilibre naturel. Le choix du lieu est guidé par l'accessibilité, le respect de l'environnement et l'harmonie avec les alentours.</p>

<blockquote><p>Cette cérémonie n'est pas conçue pour impressionner par l'excès, mais pour émouvoir par la présence, la retenue et le lien avec la nature. Une lumière filtrée. Des textures vivantes. Et un moment gardé en silence au cœur de la forêt.</p></blockquote>

<h3>Ce qui est inclus</h3>

<h4>Conception et coordination de la cérémonie</h4>
<ul>
  <li>Planification de la cérémonie de mariage et coordination le jour J par Linda Wiryani Design &amp; Event Planning (1 personne)</li>
  <li>Célébrant local parlant anglais</li>
  <li>Certificat de mariage commémoratif conçu sur mesure, en souvenir</li>
  <li>Frais d'accès au lieu inclus</li>
</ul>

<h4>Décoration florale <em>(Fleurs locales | Raffinée et naturelle)</em></h4>
<ul>
  <li>Fond de cérémonie composé d'un mélange harmonieux de fleurs fraîches d'origine locale, de verdure naturelle et de quelques éléments artificiels choisis, savamment agencés pour s'accorder avec l'environnement de la forêt ou de la jungle</li>
  <li>Pétales de fleurs le long de l'allée de la cérémonie</li>
  <li>Compositions florales d'allée guidées par la forme organique et le mouvement naturel</li>
  <li>Bouquet de la mariée en fleurs locales</li>
  <li>Boutonnière du marié assortie à l'ensemble de la palette florale</li>
</ul>

<h4>Musique</h4>
<ul>
  <li>Guitariste solo ou violoniste solo pour une musique de cérémonie discrète et pleine d'atmosphère</li>
</ul>

<h4>Photographie</h4>
<ul>
  <li>Photographe professionnel pendant 1,5 heure (1 personne)</li>
  <li>Sélection des meilleures images, soigneusement choisies et retouchées</li>
  <li>Livraison des images finales sous 1 semaine via un lien Google Drive privé</li>
</ul>

<h3>Le moment idéal</h3>
<p>Les Elopements en Forêt et en Jungle se vivent au mieux durant des plages de lumière naturelle qui s'accordent avec l'environnement de la canopée.</p>
<ul>
  <li><strong>Matin (environ 7 h 00 – 9 h 00)</strong> — Le matin apporte une humidité plus douce, une lumière tendre filtrant à travers les arbres et une atmosphère plus calme avant que la fréquentation n'augmente. Cet horaire est serein, frais et ancré.</li>
  <li><strong>Fin d'après-midi (environ 16 h 30 – 18 h 00)</strong> — La fin d'après-midi apporte des tons plus chauds et des ombres plus profondes entre les strates de la forêt. La lumière devient plus atmosphérique, créant de la profondeur et un drame subtil sous la canopée.</li>
</ul>
<p>L'horaire exact sera confirmé en fonction de la pénétration de la lumière à travers la canopée, des conditions météorologiques saisonnières, de l'accessibilité et de la réglementation du lieu, ainsi que de la sécurité et du confort général. Les cérémonies du matin offrent généralement des conditions météorologiques plus stables et une dynamique environnementale plus douce.</p>

<h3>Notes importantes</h3>
<ul>
  <li>Ce forfait est volontairement conçu pour rester simple, élégant et centré sur le moment de la cérémonie lui-même</li>
  <li>Seuls les éléments listés ci-dessus sont inclus</li>
  <li>Ce forfait est conçu pour un couple uniquement</li>
  <li>L'horaire de la cérémonie sera confirmé une fois le lieu choisi, en tenant compte de la lumière naturelle, de la canopée forestière et des conditions environnementales générales</li>
  <li>Tarifs du forfait à partir de <strong>25 000 000 IDR</strong></li>
</ul>

<h3>Météo et conditions naturelles</h3>
<p>Les environnements de jungle sont naturellement dynamiques et influencés par le climat tropical. Les conditions peuvent inclure des pluies soudaines ou des averses passagères, une forte humidité, un terrain irrégulier ou naturel, des insectes et la faune forestière, ainsi qu'une lumière changeante sous la canopée.</p>
<p>Ces cérémonies se déroulant dans des cadres naturels en plein air, les conditions météorologiques échappent à notre contrôle. En cas de pluie, aucun lieu de repli intérieur fixe n'est garanti, sauf s'il est spécifiquement proposé par le lieu choisi. La cérémonie peut être brièvement suspendue le temps que la météo se stabilise ou, si possible, repositionnée dans une zone naturellement abritée du lieu. Les éléments floraux et le décor peuvent être ajustés ou simplifiés pour garantir la sécurité et la stabilité des structures.</p>
<p>Le couple reconnaît que les conditions de la forêt tropicale sont inhérentes à ce cadre et ne constituent pas un motif d'annulation, de remboursement ou de report, sauf accord contraire écrit. La sécurité et le respect de l'environnement restent en tout temps la priorité absolue.</p>

<h3>Conditions de paiement et de réservation</h3>
<ul>
  <li>Un acompte non remboursable de 50 % est exigé à la confirmation de la réservation</li>
  <li>Le solde de 50 % doit être réglé au plus tard 30 jours avant la date de l'événement</li>
  <li>La date de l'événement n'est pas considérée comme réservée tant que l'acompte n'a pas été reçu</li>
  <li>Tous les paiements effectués sont non remboursables, sauf mention contraire écrite</li>
  <li>Le défaut de paiement du solde dans le délai convenu peut entraîner l'annulation des services sans remboursement de l'acompte initial</li>
  <li>Toute modification demandée après confirmation concernant le lieu, la date de la cérémonie ou les principaux éléments de design est soumise aux disponibilités et peut entraîner des frais supplémentaires selon les ajustements logistiques ou ceux des prestataires</li>
  <li>Les frais d'accès au lieu et les éventuels permis propres à l'emplacement suivent, le cas échéant, les règles de chaque lieu</li>
</ul>

<h3>Non inclus</h3>
<p>Les éléments suivants peuvent être organisés séparément sur demande : frais de lieu ou d'événement (le cas échéant), hébergement ou séjour, transport, système de sonorisation ou équipement audio supplémentaire, vidéographie ou drone, musiciens supplémentaires ou animation en direct, coiffure et maquillage, robe de mariée, costumes ou accessoires, répétitions impliquant l'ensemble des prestataires, ainsi que tout élément non expressément mentionné sous « Ce qui est inclus ».</p>`,
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
    title: "Elopements près d'une Cascade",
    description: `<p>Les Elopements près d'une Cascade sont conçus pour les couples attirés par le mouvement brut, les sons de la nature et la présence apaisante de l'eau qui coule. Face à des chutes d'eau en cascade et entourées d'une végétation luxuriante, ces célébrations sont façonnées par la brume, la lumière et le rythme élémentaire de la nature.</p>

<p>Ici, l'eau n'est pas qu'un élément du paysage. Elle devient partie intégrante de l'atmosphère de la cérémonie, en guidant le rythme, le ton et la profondeur émotionnelle.</p>

<p>Linda Wiryani Design and Event Planning travaille avec une sélection de sanctuaires de cascades et de lieux intégrés à la nature, où le paysage, l'accessibilité et le respect de l'environnement sont soigneusement pris en compte. Le choix du lieu privilégie la sécurité, l'intimité et l'harmonie avec les alentours.</p>

<blockquote><p>Cette cérémonie n'est pas conçue pour impressionner par l'excès, mais pour émouvoir par le mouvement, l'ancrage et la présence élémentaire. L'eau qui tombe. Une brume légère. Et un moment porté doucement par la nature elle-même.</p></blockquote>

<h3>Ce qui est inclus</h3>

<h4>Conception et coordination de la cérémonie</h4>
<ul>
  <li>Planification de la cérémonie de mariage et coordination le jour J par Linda Wiryani Design &amp; Event Planning (1 personne)</li>
  <li>Célébrant local parlant anglais</li>
  <li>Certificat de mariage commémoratif conçu sur mesure, en souvenir</li>
  <li>Frais d'accès au lieu inclus</li>
</ul>

<h4>Décoration florale <em>(Fleurs locales | Raffinée et naturelle)</em></h4>
<ul>
  <li>Fond de cérémonie composé d'un mélange harmonieux de fleurs fraîches d'origine locale, de verdure naturelle et de quelques éléments artificiels choisis, savamment agencés pour s'accorder avec l'environnement de la cascade</li>
  <li>Pétales de fleurs le long de l'allée de la cérémonie</li>
  <li>Compositions florales d'allée guidées par la forme organique et le respect de l'environnement</li>
  <li>Bouquet de la mariée en fleurs locales</li>
  <li>Boutonnière du marié assortie à l'ensemble de la palette florale</li>
</ul>

<h4>Musique</h4>
<ul>
  <li>Guitariste solo ou violoniste solo pour une musique de cérémonie discrète et pleine d'atmosphère <em>(Remarque : le volume de la musique live peut être ajusté en fonction du bruit naturel de la cascade.)</em></li>
</ul>

<h4>Photographie</h4>
<ul>
  <li>Photographe professionnel pendant 1,5 heure (1 personne)</li>
  <li>Sélection des meilleures images, soigneusement choisies et retouchées</li>
  <li>Livraison des images finales sous 1 semaine via un lien Google Drive privé</li>
</ul>

<h3>Le moment idéal</h3>
<p>Les Elopements près d'une Cascade se vivent au mieux lorsque la lumière naturelle et la fréquentation des lieux sont les plus favorables.</p>
<ul>
  <li><strong>Tôt le matin (environ 6 h 00 – 8 h 00)</strong> — Les cérémonies du matin offrent une lumière plus douce, une présence réduite de visiteurs, une atmosphère plus calme et un débit d'eau plus stable. L'environnement est frais, intime et serein.</li>
  <li><strong>Fin d'après-midi (environ 16 h 30 – 17 h 30)</strong> — La fin d'après-midi peut offrir des tons plus chauds et des ombres plus douces ; toutefois, l'affluence de visiteurs et le taux d'humidité peuvent varier selon le lieu.</li>
</ul>
<p>L'horaire du matin est généralement recommandé pour une plus grande intimité, un terrain plus sûr, un éclairage plus constant et une fréquentation publique réduite. L'horaire définitif sera confirmé en fonction des conditions météorologiques saisonnières, de l'accessibilité et des considérations de sécurité générales.</p>

<h3>Notes importantes</h3>
<ul>
  <li>Ce forfait est volontairement conçu pour rester simple, élégant et centré sur le moment de la cérémonie lui-même</li>
  <li>Seuls les éléments listés ci-dessus sont inclus</li>
  <li>Ce forfait est conçu pour un couple uniquement</li>
  <li>L'horaire de la cérémonie sera confirmé une fois le lieu choisi, en tenant compte de la lumière naturelle, du débit de l'eau et des conditions environnementales</li>
  <li>Tarifs du forfait à partir de <strong>25 000 000 IDR</strong></li>
</ul>

<h3>Météo et conditions naturelles</h3>
<p>Les environnements de cascades sont naturellement dynamiques et influencés par les précipitations saisonnières, le débit de l'eau, l'état du terrain et les conditions météorologiques tropicales. Les conditions peuvent inclure des pluies soudaines ou des averses passagères, une augmentation du volume d'eau après la pluie, un terrain naturel glissant ou irrégulier, l'humidité et la brume, le bruit ambiant naturel de l'eau qui coule, et une accessibilité limitée selon le lieu.</p>
<p>Ces cérémonies se déroulant dans des environnements naturels actifs, les conditions échappent à notre contrôle. En cas de pluie ou de fort débit d'eau, la cérémonie peut être temporairement suspendue le temps que les conditions se stabilisent. Si le niveau de l'eau ou le terrain sont jugés dangereux, la cérémonie peut être déplacée vers une zone voisine plus sûre du lieu, si possible. Les installations florales et le décor peuvent être ajustés, simplifiés ou sécurisés afin de garantir la sécurité des structures. Les décisions de sécurité prises par le Planner ou la direction du lieu sont définitives.</p>
<p>Ce forfait n'inclut pas de lieu de repli intérieur garanti, sauf mention spécifique. Le couple reconnaît que les conditions propres à la cascade sont inhérentes à ce cadre et ne constituent pas un motif d'annulation, de remboursement ou de report, sauf accord contraire écrit. La sécurité et le respect de l'environnement restent la priorité absolue.</p>

<h3>Conditions de paiement et de réservation</h3>
<ul>
  <li>Un acompte non remboursable de 50 % est exigé à la confirmation de la réservation</li>
  <li>Le solde de 50 % doit être réglé au plus tard 30 jours avant la date de l'événement</li>
  <li>La date de l'événement n'est pas réservée tant que l'acompte n'a pas été reçu</li>
  <li>Tous les paiements effectués sont non remboursables, sauf accord contraire écrit</li>
  <li>Le défaut de paiement du solde dans le délai convenu peut entraîner l'annulation des services sans remboursement de l'acompte</li>
  <li>Toute modification demandée concernant la date de la cérémonie, le lieu ou les éléments clés après confirmation est soumise aux disponibilités et peut entraîner des frais supplémentaires selon le report des prestataires ou les ajustements de permis</li>
  <li>Les permis du lieu et les droits d'entrée (le cas échéant) suivent les règles propres à chaque site de cascade</li>
</ul>

<h3>Non inclus</h3>
<p>Les éléments suivants peuvent être organisés séparément sur demande : frais de lieu ou d'événement (le cas échéant), hébergement ou séjour, transport, système de sonorisation ou équipement audio supplémentaire, vidéographie ou drone, musiciens supplémentaires ou animation en direct, coiffure et maquillage, robe de mariée, costumes ou accessoires, répétitions impliquant l'ensemble des prestataires, ainsi que tout élément non expressément mentionné sous « Ce qui est inclus ».</p>`,
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
    title: "Elopements dans les Rizières",
    description: `<p>Les Elopements dans les Rizières sont conçus pour les couples attirés par les horizons ouverts, les brises légères et la poésie tranquille des paysages ruraux. Au milieu des rizières en terrasses luxuriantes de Bali et des champs agricoles, ces célébrations se déploient sous de larges ciels, une lumière douce et le calme rythmé de la nature.</p>

<p>Ici, le paysage n'est pas simplement un décor. Il façonne l'atmosphère de la cérémonie et offre quiétude, ouverture et une simplicité qui ancre.</p>

<p>Linda Wiryani Design and Event Planning travaille avec une sélection de lieux en rizière et de cadres campagnards, où l'accessibilité, l'intimité et l'harmonie avec l'environnement local sont soigneusement pris en compte. Le choix du lieu respecte à la fois le terrain naturel et la communauté environnante.</p>

<blockquote><p>Cette cérémonie n'est pas conçue pour impressionner par l'excès, mais pour émouvoir par l'ouverture, l'équilibre et un lien tranquille. Un ciel ouvert. Une lumière douce. Et un moment tenu tendrement au milieu des champs.</p></blockquote>

<h3>Ce qui est inclus</h3>

<h4>Conception et coordination de la cérémonie</h4>
<ul>
  <li>Planification de la cérémonie de mariage et coordination le jour J par Linda Wiryani Design &amp; Event Planning (1 personne)</li>
  <li>Célébrant local parlant anglais</li>
  <li>Certificat de mariage commémoratif conçu sur mesure, en souvenir</li>
  <li>Frais d'accès au lieu inclus</li>
</ul>

<h4>Décoration florale <em>(Fleurs locales | Raffinée et naturelle)</em></h4>
<ul>
  <li>Fond de cérémonie composé d'un mélange harmonieux de fleurs fraîches d'origine locale, de verdure naturelle et de quelques éléments artificiels choisis, savamment agencés pour s'accorder avec le paysage de la rizière</li>
  <li>Pétales de fleurs le long de l'allée de la cérémonie</li>
  <li>Compositions florales d'allée guidées par la forme organique et la simplicité naturelle</li>
  <li>Bouquet de la mariée en fleurs locales</li>
  <li>Boutonnière du marié assortie à l'ensemble de la palette florale</li>
</ul>

<h4>Musique</h4>
<ul>
  <li>Guitariste solo ou violoniste solo pour une musique de cérémonie discrète et pleine d'atmosphère</li>
</ul>

<h4>Photographie</h4>
<ul>
  <li>Photographe professionnel pendant 1,5 heure (1 personne)</li>
  <li>Sélection des meilleures images, soigneusement choisies et retouchées</li>
  <li>Livraison des images finales sous 1 semaine via un lien Google Drive privé</li>
</ul>

<h3>Le moment idéal</h3>
<p>Les Elopements dans les Rizières se vivent au mieux lorsque la lumière est douce et les températures agréables.</p>
<ul>
  <li><strong>Tôt le matin (environ 6 h 00 – 8 h 00)</strong> — Le matin offre un air plus frais, une lumière naturelle plus douce et une atmosphère rurale plus paisible avant que les travaux agricoles ne s'intensifient. La lumière est fraîche et tendre sur les terrasses.</li>
  <li><strong>Fin d'après-midi / coucher de soleil (environ 17 h 00 – 18 h 30)</strong> — Les cérémonies au coucher du soleil offrent des tons dorés chauds sur les champs, créant profondeur et éclat dans le paysage. L'atmosphère est vaste et romantique.</li>
</ul>
<p>L'horaire du matin est généralement recommandé pour des températures plus fraîches, des conditions météorologiques plus stables, une plus grande intimité et un éclairage plus doux. L'horaire définitif sera confirmé en fonction des schémas de lumière saisonniers, des cycles agricoles et du confort environnemental général.</p>

<h3>Notes importantes</h3>
<ul>
  <li>Ce forfait est volontairement conçu pour rester simple, élégant et centré sur le moment de la cérémonie lui-même</li>
  <li>Seuls les éléments listés ci-dessus sont inclus</li>
  <li>Ce forfait est conçu pour un couple uniquement</li>
  <li>L'horaire de la cérémonie sera confirmé une fois le lieu choisi, en tenant compte de la lumière naturelle, de l'état des champs et de l'atmosphère générale</li>
  <li>Tarifs du forfait à partir de <strong>25 000 000 IDR</strong></li>
</ul>

<h3>Météo et conditions naturelles</h3>
<p>Les rizières sont des environnements naturellement ouverts et entièrement exposés au climat tropical. Les facteurs peuvent inclure l'exposition directe au soleil et à la chaleur, le vent à travers les champs ouverts, des pluies tropicales soudaines, de la boue ou un sol meuble selon la saison, les insectes courants dans les paysages ruraux, ainsi que l'activité agricole selon les cycles de plantation.</p>
<p>Ces cérémonies se déroulant dans des cadres ruraux actifs, la météo et l'état des champs échappent à notre contrôle. En cas de pluie ou de vent fort, la cérémonie peut être temporairement suspendue le temps que les conditions se calment ou, si possible, déplacée vers une zone abritée à proximité. Les éléments floraux et les installations décoratives peuvent être ajustés, sécurisés ou simplifiés afin de garantir la sécurité et l'harmonie visuelle. L'état du terrain peut limiter certains éléments de décoration pour des raisons de sécurité.</p>
<p>Le couple reconnaît que les rizières sont des paysages agricoles vivants et que les facteurs environnementaux sont inhérents au lieu. Les conditions météorologiques ne constituent pas un motif d'annulation, de remboursement ou de report, sauf accord contraire écrit. La sécurité, le respect de l'activité agricole locale et l'harmonie avec l'environnement restent en tout temps des priorités.</p>

<h3>Conditions de paiement et de réservation</h3>
<ul>
  <li>Un acompte non remboursable de 50 % est exigé à la confirmation de la réservation</li>
  <li>Le solde de 50 % doit être réglé au plus tard 30 jours avant la date de l'événement</li>
  <li>La date de l'événement n'est pas considérée comme réservée tant que l'acompte n'a pas été reçu</li>
  <li>Tous les paiements effectués sont non remboursables, sauf accord contraire écrit</li>
  <li>Le défaut de paiement du solde dans le délai convenu peut entraîner l'annulation des services sans remboursement de l'acompte</li>
  <li>Toute modification demandée concernant le lieu, l'horaire de la cérémonie ou les éléments clés après confirmation est soumise aux disponibilités et peut entraîner des frais supplémentaires selon les ajustements logistiques ou ceux des prestataires</li>
  <li>Les frais d'accès au lieu et les autorisations de la communauté locale (le cas échéant) suivent les règles locales et peuvent varier selon la rizière choisie</li>
</ul>

<h3>Non inclus</h3>
<p>Les éléments suivants peuvent être organisés séparément sur demande : frais de lieu ou d'événement (le cas échéant), hébergement ou séjour, transport, système de sonorisation ou équipement audio supplémentaire, vidéographie ou drone, musiciens supplémentaires ou animation en direct, coiffure et maquillage, robe de mariée, costumes ou accessoires, répétitions impliquant l'ensemble des prestataires, ainsi que tout élément non expressément mentionné sous « Ce qui est inclus ».</p>`,
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
    title: "Elopements en Bord de Mer",
    description: `<p>Les Elopements en Bord de Mer sont conçus pour les couples attirés par les lignes d'horizon, la brise océane et le rythme élémentaire de la mer. Le long du littoral de Bali, là où les vagues rencontrent le ciel ouvert, ces cérémonies se déroulent dans un air chargé de sel, une lumière changeante et la présence apaisante de l'eau.</p>

<p>Ici, l'océan n'est pas qu'un simple décor. Il façonne l'atmosphère de la cérémonie et apporte mouvement, clarté et un sentiment de calme infini.</p>

<p>Linda Wiryani Design and Event Planning travaille avec une sélection de lieux en bord de mer et de cadres côtiers, où l'intimité, l'accessibilité, les conditions de marée et le respect de l'environnement sont soigneusement pris en compte. Le choix du lieu respecte à la fois le littoral naturel et la réglementation locale.</p>

<blockquote><p>Cette cérémonie n'est pas conçue pour impressionner par l'excès, mais pour émouvoir par l'ouverture, l'équilibre et un lien tranquille. Un horizon sans fin. L'air salin. Et un vœu porté doucement par la mer.</p></blockquote>

<h3>Ce qui est inclus</h3>

<h4>Conception et coordination de la cérémonie</h4>
<ul>
  <li>Planification de la cérémonie de mariage et coordination le jour J par Linda Wiryani Design &amp; Event Planning (1 personne)</li>
  <li>Célébrant local parlant anglais</li>
  <li>Certificat de mariage commémoratif conçu sur mesure, en souvenir</li>
  <li>Frais d'accès au lieu inclus (le cas échéant, dans le cadre du lieu en bord de mer convenu)</li>
</ul>

<h4>Décoration florale <em>(Fleurs locales | Raffinée et d'inspiration côtière)</em></h4>
<ul>
  <li>Fond de cérémonie composé d'un mélange harmonieux de fleurs fraîches d'origine locale, de verdure naturelle et de quelques éléments artificiels choisis, savamment agencés pour s'accorder avec le cadre océanique</li>
  <li>Pétales de fleurs le long de l'allée de la cérémonie</li>
  <li>Compositions florales d'allée guidées par le flux organique et la simplicité côtière</li>
  <li>Bouquet de la mariée en fleurs d'origine locale</li>
  <li>Boutonnière du marié assortie à l'ensemble de la palette florale</li>
</ul>

<h4>Musique</h4>
<ul>
  <li>Guitariste solo ou violoniste solo pour une musique de cérémonie discrète et pleine d'atmosphère</li>
</ul>

<h4>Photographie</h4>
<ul>
  <li>Photographe professionnel pendant 1,5 heure (1 personne)</li>
  <li>Sélection des meilleures images, soigneusement choisies et retouchées</li>
  <li>Livraison des images finales sous 1 semaine via un lien Google Drive privé</li>
</ul>

<h3>Le moment idéal</h3>
<p>Les Elopements en Bord de Mer se vivent au mieux durant des plages de lumière naturelle qui s'accordent avec l'atmosphère côtière.</p>
<ul>
  <li><strong>Matin (environ 7 h 00 – 9 h 00)</strong> — Les cérémonies du matin offrent des vents plus doux, des températures plus fraîches, moins de visiteurs et une lumière naturelle tendre. L'atmosphère est calme, intime et sereine.</li>
  <li><strong>Coucher de soleil (environ 17 h 00 – 18 h 30)</strong> — Le coucher du soleil apporte des tons dorés spectaculaires sur l'horizon océanique. La lumière s'adoucit peu à peu en teintes chaudes, créant une ambiance cinématographique et romantique.</li>
</ul>
<p>Les cérémonies du matin sont généralement recommandées pour une plus grande intimité, des vents plus stables, un éclairage plus doux et un meilleur confort. L'horaire définitif de la cérémonie sera confirmé en fonction des variations saisonnières du coucher du soleil, des horaires de marée, des prévisions de vent et de l'accessibilité du lieu.</p>

<h3>Notes importantes</h3>
<ul>
  <li>Ce forfait est volontairement conçu pour rester simple, élégant et centré sur le moment de la cérémonie lui-même</li>
  <li>Seuls les éléments listés ci-dessus sont inclus</li>
  <li>Ce forfait est conçu pour un couple uniquement</li>
  <li>L'horaire de la cérémonie sera confirmé une fois le lieu choisi, en tenant compte des marées, de la lumière naturelle, des conditions de vent et de l'atmosphère générale</li>
  <li>Tarifs du forfait à partir de <strong>25 000 000 IDR</strong></li>
</ul>

<h3>Météo et conditions naturelles</h3>
<p>Les plages sont des environnements naturellement dynamiques et entièrement exposés au climat côtier. Les facteurs peuvent inclure des vents forts ou changeants, des pluies tropicales soudaines, une forte chaleur et une exposition directe au soleil, les variations de marée, le déplacement du sable et un terrain irrégulier, ainsi que l'accès du public selon le lieu.</p>
<p>Ces cérémonies se déroulant dans des cadres côtiers ouverts, la météo et les conditions de marée échappent à notre contrôle. En cas de pluie, de vent fort ou de conditions de marée dangereuses, la cérémonie peut être brièvement suspendue le temps que les conditions se stabilisent. Si le lieu dispose d'un espace abrité ou intérieur, la cérémonie peut y être déplacée si possible. Les installations florales et les structures décoratives peuvent être ajustées, sécurisées, simplifiées ou repositionnées afin de garantir la sécurité. Les éléments de décoration peuvent être modifiés en raison de l'intensité du vent ou de l'état du sable. Les décisions de sécurité prises par le Planner ou la direction du lieu sont définitives.</p>
<p>Le couple reconnaît que les environnements en bord de mer sont soumis aux forces naturelles du littoral et que les changements météorologiques ou de marée ne constituent pas un motif d'annulation, de remboursement ou de report, sauf accord contraire écrit.</p>

<h3>Conditions de paiement et de réservation</h3>
<ul>
  <li>Un acompte non remboursable de 50 % est exigé à la confirmation de la réservation</li>
  <li>Le solde de 50 % doit être réglé au plus tard 30 jours avant la date de l'événement</li>
  <li>La date de l'événement n'est pas réservée tant que l'acompte n'a pas été reçu</li>
  <li>Tous les paiements effectués sont non remboursables, sauf accord contraire écrit</li>
  <li>Le défaut de paiement du solde dans le délai convenu peut entraîner l'annulation des services sans remboursement de l'acompte</li>
  <li>Toute modification demandée concernant le lieu, la date de la cérémonie ou les éléments clés après confirmation est soumise aux disponibilités et peut entraîner des frais supplémentaires selon les ajustements des prestataires ou la politique du lieu</li>
  <li>Les frais de location du lieu, les permis et les règles d'accès (le cas échéant) suivent les règles propres au site en bord de mer et sont distincts, sauf mention explicite contraire</li>
</ul>

<h3>Non inclus</h3>
<p>Les éléments suivants peuvent être organisés séparément sur demande : hébergement ou séjour, transport, système de sonorisation ou équipement audio supplémentaire, vidéographie ou drone, musiciens supplémentaires ou animation en direct, coiffure et maquillage, robe de mariée, costumes ou accessoires, répétitions impliquant l'ensemble des prestataires, ainsi que tout élément non expressément mentionné sous « Ce qui est inclus ».</p>`,
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
    title: "Elopements au Bord d'un Lac",
    description: `<p>Les Elopements au Bord d'un Lac sont conçus pour les couples attirés par les eaux calmes, l'air de montagne et la profondeur silencieuse de la contemplation. Au bord des lacs paisibles de Bali, où la brume s'élève doucement de la surface et où les collines lointaines encadrent l'horizon, ces cérémonies se déroulent dans un air frais, une lumière adoucie et une tranquillité ancrée.</p>

<p>Ici, le lac n'est pas qu'un simple décor. Il façonne l'atmosphère de la cérémonie et offre quiétude, clarté et un profond sentiment de présence.</p>

<p>Linda Wiryani Design and Event Planning travaille avec une sélection de lieux au bord de lacs et de cadres de hautes terres, où l'accessibilité, l'intimité, les conditions climatiques et l'harmonie avec l'environnement sont soigneusement pris en compte. Le choix du lieu respecte à la fois le paysage naturel et les traditions des communautés environnantes.</p>

<blockquote><p>Cette cérémonie n'est pas conçue pour impressionner par l'excès, mais pour émouvoir par le calme, l'équilibre et un lien tranquille. Une brume légère. Une eau paisible. Et un vœu doucement reflété sur le lac.</p></blockquote>

<h3>Ce qui est inclus</h3>

<h4>Conception et coordination de la cérémonie</h4>
<ul>
  <li>Planification de la cérémonie de mariage et coordination le jour J par Linda Wiryani Design &amp; Event Planning (1 personne)</li>
  <li>Célébrant local parlant anglais</li>
  <li>Certificat de mariage commémoratif conçu sur mesure, en souvenir</li>
  <li>Frais d'accès au lieu inclus (le cas échéant, dans le cadre du lieu au bord du lac convenu)</li>
</ul>

<h4>Décoration florale <em>(Fleurs locales | Raffinée et inspirée de la nature)</em></h4>
<ul>
  <li>Fond de cérémonie composé d'un mélange harmonieux de fleurs fraîches d'origine locale, de verdure naturelle et de quelques éléments artificiels choisis, savamment agencés pour s'accorder avec l'environnement du lac</li>
  <li>Pétales de fleurs le long de l'allée de la cérémonie</li>
  <li>Compositions florales d'allée guidées par la forme organique et la simplicité naturelle</li>
  <li>Bouquet de la mariée en fleurs d'origine locale</li>
  <li>Boutonnière du marié assortie à l'ensemble de la palette florale</li>
</ul>

<h4>Musique</h4>
<ul>
  <li>Guitariste solo ou violoniste solo pour une musique de cérémonie discrète et pleine d'atmosphère</li>
</ul>

<h4>Photographie</h4>
<ul>
  <li>Photographe professionnel pendant 1,5 heure (1 personne)</li>
  <li>Sélection des meilleures images, soigneusement choisies et retouchées</li>
  <li>Livraison des images finales sous 1 semaine via un lien Google Drive privé</li>
</ul>

<h3>Le moment idéal</h3>
<p>Les Elopements au Bord d'un Lac se vivent au mieux lorsque la lumière et l'atmosphère sont les plus équilibrées.</p>
<ul>
  <li><strong>Matin (environ 7 h 00 – 9 h 00)</strong> — Les cérémonies du matin offrent souvent une surface de l'eau calme, une lumière douce et diffuse et une atmosphère sereine avant que la fréquentation n'augmente. La brume peut ajouter au cadre une touche poétique et éthérée.</li>
  <li><strong>Fin d'après-midi (environ 16 h 30 – 18 h 00)</strong> — La fin d'après-midi apporte des tons plus chauds sur l'eau et les collines environnantes, créant de la profondeur et de subtils reflets dorés.</li>
</ul>
<p>L'horaire du matin est généralement recommandé pour des vents plus stables, une surface de l'eau plus calme, une plus grande intimité et un éclairage plus doux. L'horaire définitif de la cérémonie sera confirmé en fonction des conditions météorologiques saisonnières, de la visibilité, du mouvement du vent et de l'accessibilité du lieu.</p>

<h3>Notes importantes</h3>
<ul>
  <li>Ce forfait est volontairement conçu pour rester simple, élégant et centré sur le moment de la cérémonie lui-même</li>
  <li>Seuls les éléments listés ci-dessus sont inclus</li>
  <li>Ce forfait est conçu pour un couple uniquement</li>
  <li>L'horaire de la cérémonie sera confirmé une fois le lieu choisi, en tenant compte de la lumière de montagne, des conditions de brume, du régime des vents et de l'atmosphère générale</li>
  <li>Tarifs du forfait à partir de <strong>25 000 000 IDR</strong></li>
</ul>

<h3>Météo et conditions naturelles</h3>
<p>Les environnements lacustres sont influencés par le climat des hautes terres et de la montagne. La météo peut changer plus rapidement que dans les zones côtières. Les facteurs peuvent inclure la brume ou le brouillard matinal, des pluies soudaines, des températures plus fraîches, le vent sur l'eau libre, des variations d'humidité et des changements saisonniers du niveau de l'eau.</p>
<p>Ces cérémonies se déroulant dans des cadres naturels en plein air, la météo et les conditions environnementales échappent à notre contrôle. En cas de pluie, de vent fort ou de brouillard dense, la cérémonie peut être brièvement suspendue le temps que les conditions se calment. Si le lieu dispose d'un espace couvert ou intérieur, la cérémonie peut y être déplacée si possible. Les installations florales et les structures décoratives peuvent être sécurisées, simplifiées ou repositionnées afin de garantir la sécurité et l'équilibre esthétique. Les limitations de visibilité dues à la brume ou au brouillard sont considérées comme des conditions naturelles du lieu. Les décisions de sécurité prises par le Planner ou la direction du lieu sont définitives.</p>
<p>Le couple reconnaît que les environnements de lac et de montagne sont soumis à des variations météorologiques naturelles et que ces conditions ne constituent pas un motif d'annulation, de remboursement ou de report, sauf accord contraire écrit.</p>

<h3>Conditions de paiement et de réservation</h3>
<ul>
  <li>Un acompte non remboursable de 50 % est exigé à la confirmation de la réservation</li>
  <li>Le solde de 50 % doit être réglé au plus tard 30 jours avant la date de l'événement</li>
  <li>La date de l'événement n'est pas considérée comme réservée tant que l'acompte n'a pas été reçu</li>
  <li>Tous les paiements effectués sont non remboursables, sauf accord contraire écrit</li>
  <li>Le défaut de paiement du solde dans le délai convenu peut entraîner l'annulation des services sans remboursement de l'acompte initial</li>
  <li>Toute modification demandée concernant le lieu, la date de la cérémonie ou les éléments clés après confirmation est soumise aux disponibilités et peut entraîner des frais supplémentaires selon les ajustements des prestataires ou la politique du lieu</li>
  <li>Les frais d'accès au lieu et les permis locaux (le cas échéant) suivent les règles de chaque site et sont distincts, sauf mention explicite contraire</li>
</ul>

<h3>Non inclus</h3>
<p>Les éléments suivants peuvent être organisés séparément sur demande : hébergement ou séjour, transport, système de sonorisation ou équipement audio supplémentaire, vidéographie ou drone, musiciens supplémentaires ou animation en direct, coiffure et maquillage, robe de mariée, costumes ou accessoires, répétitions impliquant l'ensemble des prestataires, ainsi que tout élément non expressément mentionné sous « Ce qui est inclus ».</p>`,
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
    title: "Elopements en Volcan et en Montagne",
    description: `<p>Les Elopements en Volcan et en Montagne sont conçus pour les couples attirés par l'altitude, les vastes horizons et la force tranquille de la terre. Dans les majestueux paysages volcaniques de Bali et sur les crêtes des hautes terres, où les nuages dérivent sur les sommets et où la lumière du matin se déploie lentement sur le relief, ces cérémonies se déroulent dans un air vif, des vues vastes et un profond sentiment d'ancrage.</p>

<p>Ici, la montagne n'est pas qu'un simple décor. Elle façonne l'atmosphère de la cérémonie et offre perspective, résilience et un silence puissant, à la fois intime et infini.</p>

<p>Linda Wiryani Design and Event Planning travaille avec une sélection de points de vue en montagne et de paysages volcaniques, où l'accessibilité, les conditions de sécurité, le relief et le respect de l'environnement sont soigneusement pris en compte. Le choix du lieu respecte la topographie naturelle ainsi que les sensibilités culturelles locales liées aux montagnes sacrées.</p>

<blockquote><p>Cette cérémonie n'est pas conçue pour impressionner par l'excès, mais pour émouvoir par l'altitude, la présence et une puissance tranquille. Un air vif. Un vaste horizon. Et un moment tenu fermement au bord de la terre.</p></blockquote>

<h3>Ce qui est inclus</h3>

<h4>Conception et coordination de la cérémonie</h4>
<ul>
  <li>Planification de la cérémonie de mariage et coordination le jour J par Linda Wiryani Design &amp; Event Planning (1 personne)</li>
  <li>Célébrant local parlant anglais</li>
  <li>Certificat de mariage commémoratif conçu sur mesure, en souvenir</li>
  <li>Frais d'accès au lieu inclus (le cas échéant, dans le cadre du site de montagne ou de volcan convenu)</li>
</ul>

<h4>Décoration florale <em>(Fleurs locales | Raffinée et organique)</em></h4>
<ul>
  <li>Fond de cérémonie composé d'un mélange harmonieux de fleurs fraîches d'origine locale, de verdure naturelle et de quelques éléments artificiels choisis, savamment agencés pour s'accorder avec le paysage volcanique ou montagneux</li>
  <li>Pétales de fleurs le long de l'allée de la cérémonie</li>
  <li>Compositions florales d'allée guidées par la forme organique et la retenue naturelle</li>
  <li>Bouquet de la mariée en fleurs d'origine locale</li>
  <li>Boutonnière du marié assortie à l'ensemble de la palette florale</li>
</ul>

<h4>Musique</h4>
<ul>
  <li>Guitariste solo ou violoniste solo pour une musique de cérémonie discrète et pleine d'atmosphère</li>
</ul>

<h4>Photographie</h4>
<ul>
  <li>Photographe professionnel pendant 1,5 heure (1 personne)</li>
  <li>Sélection des meilleures images, soigneusement choisies et retouchées</li>
  <li>Livraison des images finales sous 1 semaine via un lien Google Drive privé</li>
</ul>

<h3>Le moment idéal</h3>
<p>Les Elopements en Volcan et en Montagne se vivent au mieux lorsque la lumière et la visibilité s'accordent avec le rythme naturel du paysage.</p>
<ul>
  <li><strong>Tôt le matin (environ 6 h 30 – 8 h 30)</strong> — Le matin est généralement l'horaire le plus recommandé. Le ciel est souvent plus dégagé, le vent plus calme et la visibilité meilleure avant que les nuages ne s'accumulent. L'atmosphère est fraîche, vaste et d'une puissance tranquille.</li>
  <li><strong>Fin d'après-midi (environ 16 h 30 – 18 h 00)</strong> — La fin d'après-midi peut offrir des tons dorés chauds sur le relief ; toutefois, la visibilité peut varier selon le mouvement des nuages et l'altitude.</li>
</ul>
<p>Les cérémonies du matin sont fortement recommandées pour des vues de montagne plus dégagées, des vents plus stables, une meilleure visibilité, ainsi qu'un plus grand confort et une plus grande sécurité. L'horaire définitif sera confirmé en fonction des conditions météorologiques saisonnières, des tendances de formation des nuages, des prévisions de vent et des conditions d'accessibilité.</p>

<h3>Notes importantes</h3>
<ul>
  <li>Ce forfait est volontairement conçu pour rester simple, élégant et centré sur le moment de la cérémonie lui-même</li>
  <li>Seuls les éléments listés ci-dessus sont inclus</li>
  <li>Ce forfait est conçu pour un couple uniquement</li>
  <li>L'horaire de la cérémonie sera confirmé une fois le lieu choisi, en tenant compte de la lumière du lever ou du coucher du soleil, du mouvement des nuages, des conditions de vent et de l'atmosphère générale</li>
  <li>Tarifs du forfait à partir de <strong>25 000 000 IDR</strong></li>
</ul>

<h3>Météo et conditions naturelles</h3>
<p>Les environnements de montagne et volcaniques sont naturellement dynamiques et influencés par l'altitude et les schémas climatiques saisonniers. Les conditions peuvent inclure des changements météorologiques rapides, une exposition à des vents forts ou soudains, des températures plus fraîches, la brume matinale ou le mouvement des nuages, une visibilité parfois limitée, un terrain naturel irrégulier, ainsi qu'un accès restreint dans certaines zones sacrées ou protégées.</p>
<p>Ces cérémonies se déroulant dans des cadres extérieurs en altitude, la météo et l'état du terrain échappent à notre contrôle. En cas de pluie, de vent fort, de brume épaisse ou de visibilité réduite, la cérémonie peut être temporairement suspendue le temps que les conditions se stabilisent. Si possible, la cérémonie peut être déplacée vers une zone voisine plus sûre du lieu. Les structures florales et les éléments décoratifs peuvent être sécurisés, simplifiés ou ajustés afin de garantir la sécurité et l'intégrité des structures. Les décisions de sécurité prises par le Planner ou la direction du lieu sont définitives.</p>
<p>Les environnements de montagne peuvent connaître des vents plus forts que les zones côtières ou de plaine. Le couple reconnaît que ces facteurs environnementaux sont inhérents aux paysages d'altitude et ne constituent pas un motif d'annulation, de remboursement ou de report, sauf accord contraire écrit. La sécurité, la vigilance face au terrain et le respect des sensibilités culturelles locales entourant les montagnes sacrées restent en tout temps des priorités.</p>

<h3>Conditions de paiement et de réservation</h3>
<ul>
  <li>Un acompte non remboursable de 50 % est exigé à la confirmation de la réservation</li>
  <li>Le solde de 50 % doit être réglé au plus tard 30 jours avant la date de l'événement</li>
  <li>La date de l'événement n'est pas réservée tant que l'acompte n'a pas été reçu</li>
  <li>Tous les paiements effectués sont non remboursables, sauf accord contraire écrit</li>
  <li>Le défaut de paiement du solde dans le délai convenu peut entraîner l'annulation des services sans remboursement de l'acompte</li>
  <li>Toute modification demandée concernant le lieu, la date de la cérémonie, l'horaire ou les éléments clés après confirmation est soumise aux disponibilités et peut entraîner des frais supplémentaires selon la complexité logistique, les exigences de permis ou le report des prestataires</li>
  <li>Les permis d'accès et la réglementation locale (le cas échéant) suivent les règles propres au site de montagne ou de volcan</li>
</ul>

<h3>Non inclus</h3>
<p>Les éléments suivants peuvent être organisés séparément sur demande : hébergement ou séjour, transport (l'accès en montagne peut nécessiter des véhicules spécifiques), système de sonorisation ou équipement audio supplémentaire, vidéographie ou drone, musiciens supplémentaires ou animation en direct, coiffure et maquillage, robe de mariée, costumes ou accessoires, répétitions impliquant l'ensemble des prestataires, ainsi que tout élément non expressément mentionné sous « Ce qui est inclus ».</p>`,
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
    title: "Elopements en Bord de Rivière",
    description: `<p>Les Elopements en Bord de Rivière sont conçus pour les couples attirés par l'eau qui coule, les contours naturels et le rythme tranquille d'une terre façonnée par la rive. Le long des rivières de Bali, ces cérémonies se déroulent au milieu d'une végétation en strates, d'un doux mouvement et d'un calme à la fois ancré et vivant.</p>

<p>Ici, la nature n'est ni recouverte ni remodelée. Elle donne le ton, le rythme et l'atmosphère émotionnelle de la cérémonie.</p>

<p>Linda Wiryani Design and Event Planning travaille avec une sélection de lieux en bord de rivière, de berges de jungle et de sites intégrés à la nature, où l'eau, le paysage et le design coexistent en une harmonie discrète. Le choix du lieu est guidé par l'accessibilité, la sécurité et le respect de l'environnement naturel.</p>

<blockquote><p>Cette cérémonie n'est pas conçue pour impressionner par l'excès, mais pour émouvoir par le mouvement, l'équilibre et le lien avec la nature. Une eau qui coule. De doux courants. Et un moment porté tendrement le long de la rivière.</p></blockquote>

<h3>Ce qui est inclus</h3>

<h4>Conception et coordination de la cérémonie</h4>
<ul>
  <li>Planification de la cérémonie de mariage et coordination le jour J par Linda Wiryani Design &amp; Event Planning (1 personne)</li>
  <li>Célébrant local parlant anglais</li>
  <li>Certificat de mariage commémoratif conçu sur mesure, en souvenir</li>
  <li>Frais d'accès au lieu inclus</li>
</ul>

<h4>Décoration florale <em>(Fleurs locales | Raffinée et naturelle)</em></h4>
<ul>
  <li>Fond de cérémonie composé d'un mélange harmonieux de fleurs fraîches d'origine locale, de verdure naturelle et de quelques éléments artificiels choisis, savamment agencés pour s'accorder avec l'environnement de la rivière</li>
  <li>Pétales de fleurs le long de l'allée de la cérémonie</li>
  <li>Compositions florales d'allée guidées par la forme organique et le mouvement naturel</li>
  <li>Bouquet de la mariée en fleurs locales</li>
  <li>Boutonnière du marié assortie à l'ensemble de la palette florale</li>
</ul>

<h4>Musique</h4>
<ul>
  <li>Guitariste solo ou violoniste solo pour une musique de cérémonie discrète et pleine d'atmosphère</li>
</ul>

<h4>Photographie</h4>
<ul>
  <li>Photographe professionnel pendant 1,5 heure (1 personne)</li>
  <li>Sélection des meilleures images, soigneusement choisies et retouchées</li>
  <li>Livraison des images finales sous 1 semaine via un lien Google Drive privé</li>
</ul>

<h3>Le moment idéal</h3>
<p>Les Elopements en Bord de Rivière se vivent au mieux durant des plages de lumière naturelle qui s'accordent avec le mouvement de l'eau et le paysage environnant.</p>
<ul>
  <li><strong>Matin (environ 7 h 00 – 9 h 00)</strong> — Le matin offre un air plus frais, une lumière plus douce et des conditions environnementales plus calmes. L'atmosphère est fraîche, paisible et ancrée, avec une activité publique réduite.</li>
  <li><strong>Fin d'après-midi (environ 16 h 30 – 18 h 00)</strong> — La fin d'après-midi apporte des tons plus chauds et de doux reflets sur la surface de la rivière. La lumière devient plus tendre et plus atmosphérique, créant de la profondeur dans le paysage.</li>
</ul>
<p>L'horaire exact sera confirmé en fonction de la direction de la lumière naturelle, du débit de la rivière et des conditions de sécurité, des conditions météorologiques saisonnières, de l'accessibilité et de la réglementation du lieu, ainsi que du confort et de la sécurité généraux. Les cérémonies du matin offrent généralement des conditions plus stables et une atmosphère plus sereine.</p>

<h3>Notes importantes</h3>
<ul>
  <li>Ce forfait est volontairement conçu pour rester simple, élégant et centré sur le moment de la cérémonie lui-même</li>
  <li>Seuls les éléments listés ci-dessus sont inclus</li>
  <li>Ce forfait est conçu pour un couple uniquement</li>
  <li>L'horaire de la cérémonie sera confirmé une fois le lieu choisi, en tenant compte de la lumière naturelle, du débit de la rivière et des conditions environnementales générales</li>
  <li>Tarifs du forfait à partir de <strong>30 000 000 IDR</strong></li>
</ul>

<h3>Météo et conditions naturelles</h3>
<p>Les environnements en bord de rivière sont naturellement dynamiques et influencés par les conditions météorologiques tropicales et le débit de l'eau. Les conditions peuvent inclure des pluies soudaines ou des averses passagères, des variations du niveau ou de l'intensité du courant de la rivière, l'humidité et la brume naturelle, un terrain naturel irrégulier près de la berge, les insectes et la végétation environnante, ainsi que le bruit ambiant de l'eau qui coule.</p>
<p>Ces cérémonies se déroulant dans des cadres naturels en plein air, la météo et les conditions environnementales échappent à notre contrôle. En cas de pluie ou d'augmentation du débit, aucun lieu de repli intérieur fixe n'est garanti, sauf s'il est spécifiquement proposé par le lieu choisi. La cérémonie peut être brièvement suspendue le temps que les conditions se stabilisent ou, si possible, repositionnée dans une zone naturellement abritée ou plus sûre. Les éléments floraux et le décor peuvent être ajustés, sécurisés ou simplifiés afin de garantir la sécurité et la stabilité des structures.</p>
<p>Le couple reconnaît que les environnements en bord de rivière sont des systèmes naturels vivants et que ces conditions ne constituent pas un motif d'annulation, de remboursement ou de report, sauf accord contraire écrit. La sécurité et le respect de l'environnement restent en tout temps la priorité absolue.</p>

<h3>Conditions de paiement et de réservation</h3>
<ul>
  <li>Un acompte non remboursable de 50 % est exigé à la confirmation de la réservation</li>
  <li>Le solde de 50 % doit être réglé au plus tard 30 jours avant la date de l'événement</li>
  <li>La date de l'événement n'est pas considérée comme réservée tant que l'acompte n'a pas été reçu</li>
  <li>Tous les paiements effectués sont non remboursables, sauf mention contraire écrite</li>
  <li>Le défaut de paiement du solde dans le délai convenu peut entraîner l'annulation des services sans remboursement de l'acompte initial</li>
  <li>Toute modification demandée après confirmation concernant le lieu, la date de la cérémonie ou les principaux éléments de design est soumise aux disponibilités et peut entraîner des frais supplémentaires selon les ajustements logistiques ou ceux des prestataires</li>
  <li>Les frais d'accès au lieu et les éventuels permis propres à l'emplacement suivent, le cas échéant, les règles de chaque lieu</li>
</ul>

<h3>Non inclus</h3>
<p>Les éléments suivants peuvent être organisés séparément sur demande : frais de lieu ou d'événement (le cas échéant), hébergement ou séjour, transport, système de sonorisation ou équipement audio supplémentaire, vidéographie ou drone, musiciens supplémentaires ou animation en direct, coiffure et maquillage, robe de mariée, costumes ou accessoires, répétitions impliquant l'ensemble des prestataires, ainsi que tout élément non expressément mentionné sous « Ce qui est inclus ».</p>`,
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
    title: "Mariages Éco-responsables et Durables",
    description: `<p>Les Mariages Éco-responsables et Durables sont conçus pour les couples attachés à une célébration consciente, à la responsabilité environnementale et à un lien plus profond avec le lieu. Ces cérémonies sont guidées non par l'excès, mais par l'intention — chaque élément étant pensé pour son impact, son origine et sa raison d'être.</p>

<p>Dans des lieux naturels ou soigneusement choisis, ces célébrations embrassent la simplicité, les matériaux locaux et un design conscient, laissant la beauté naître de la retenue et de la conscience.</p>

<blockquote><p>Ici, la durabilité n'est pas une esthétique. C'est une philosophie qui façonne chaque décision — des matériaux et des fleurs à l'échelle, à l'approvisionnement et à l'expérience. Des choix conscients. Des matériaux naturels. Et un moment vécu avec égard pour les personnes comme pour le lieu.</p></blockquote>

<p>Linda Wiryani Design and Event Planning travaille avec un réseau sélectionné de lieux éco-responsables, d'artisans locaux et de fournisseurs responsables, afin que chaque célébration allie sensibilité environnementale et standards de design raffinés.</p>

<h3>Ce qui est inclus</h3>

<h4>Conception et coordination de la cérémonie</h4>
<ul>
  <li>Planification de la cérémonie de mariage et coordination le jour J par Linda Wiryani Design &amp; Event Planning (1 personne)</li>
  <li>Célébrant local parlant anglais</li>
  <li>Certificat de mariage commémoratif conçu sur mesure, en souvenir</li>
  <li>Frais d'accès au lieu inclus (le cas échéant)</li>
</ul>

<h4>Décoration florale <em>(Locale et design conscient)</em></h4>
<ul>
  <li>Fond de cérémonie composé d'un mélange réfléchi de fleurs fraîches d'origine locale, de verdure naturelle et de quelques éléments réutilisables ou artificiels choisis afin de minimiser les déchets</li>
  <li>Pétales de fleurs le long de l'allée de la cérémonie (lorsque cela est approprié sur le plan environnemental)</li>
  <li>Compositions florales d'allée guidées par la simplicité naturelle et un design à faible impact</li>
  <li>Bouquet de la mariée en fleurs d'origine locale</li>
  <li>Boutonnière du marié assortie à l'ensemble de la palette florale</li>
</ul>

<h4>Musique</h4>
<ul>
  <li>Guitariste solo ou violoniste solo pour une musique de cérémonie discrète et pleine d'atmosphère</li>
</ul>

<h4>Photographie</h4>
<ul>
  <li>Photographe professionnel pendant 1,5 heure (1 personne)</li>
  <li>Sélection des meilleures images, soigneusement choisies et retouchées</li>
  <li>Livraison des images finales sous 1 semaine via un lien Google Drive privé</li>
</ul>

<h3>Notes importantes</h3>
<ul>
  <li>Ce forfait est volontairement conçu pour rester simple, élégant et respectueux de l'environnement</li>
  <li>Seuls les éléments listés ci-dessus sont inclus</li>
  <li>Le choix du design et des matériaux privilégiera la durabilité, l'approvisionnement local et un impact environnemental minimal</li>
  <li>L'horaire de la cérémonie et l'installation seront adaptés au lieu choisi et aux conditions environnementales</li>
  <li>Tarifs du forfait à partir de <strong>25 000 000 IDR</strong></li>
  <li>Ce forfait est conçu pour un couple uniquement</li>
</ul>

<h3>Non inclus</h3>
<p>Les éléments suivants peuvent être organisés séparément sur demande : hébergement ou séjour, transport (des options éco-responsables sont disponibles sur demande), système de sonorisation ou équipement audio supplémentaire, vidéographie ou drone, musiciens supplémentaires ou animation en direct, coiffure et maquillage, robe de mariée, costumes ou accessoires, répétitions impliquant l'ensemble des prestataires, ainsi que tout élément non expressément mentionné sous « Ce qui est inclus ».</p>

<h3>Météo et conditions naturelles</h3>
<p>Les Mariages Éco-responsables et Durables se déroulent souvent dans des environnements naturels ou semi-ouverts et sont donc influencés par le climat et les conditions environnementales alentour. Les conditions peuvent inclure des pluies tropicales soudaines, le vent et la circulation naturelle de l'air, la chaleur et l'humidité, ainsi que des variations de terrain selon le lieu.</p>
<p>Ces cérémonies privilégiant l'harmonie avec la nature, les conditions environnementales sont accueillies plutôt que maîtrisées. En cas de météo défavorable, la cérémonie peut se dérouler comme prévu lorsque cela est possible en toute sécurité, être brièvement suspendue ou déplacée vers une zone abritée si disponible, ou voir certains éléments de design ajustés ou simplifiés afin de préserver la sécurité tout en minimisant l'impact environnemental. Aucune installation structurelle excessive ni solution perturbant l'environnement ne sera mise en place comme mesure de secours.</p>
<p>Le couple reconnaît que les célébrations éco-responsables sont conçues en harmonie avec la nature et que les conditions météorologiques ne constituent pas un motif d'annulation, de remboursement ou de report, sauf accord contraire écrit.</p>

<h3>Conditions de paiement et de réservation</h3>
<ul>
  <li>Un acompte non remboursable de 50 % est exigé à la confirmation de la réservation</li>
  <li>Le solde de 50 % doit être réglé au plus tard 30 jours avant la date de l'événement</li>
  <li>La date de l'événement n'est pas considérée comme réservée tant que l'acompte n'a pas été reçu</li>
  <li>Tous les paiements effectués sont non remboursables, sauf mention contraire écrite</li>
  <li>Le défaut de paiement du solde dans le délai convenu peut entraîner l'annulation des services sans remboursement de l'acompte initial</li>
  <li>Toute modification demandée concernant le lieu, la date de la cérémonie ou les éléments de design après confirmation est soumise aux disponibilités et peut entraîner des frais supplémentaires selon les ajustements nécessaires</li>
  <li>Les règles du lieu, les permis et les directives de durabilité suivront la réglementation de chaque site</li>
</ul>

<h3>Le moment idéal</h3>
<p>Les Mariages Éco-responsables et Durables se vivent au mieux durant des plages de lumière naturelle qui réduisent l'impact environnemental et améliorent le confort.</p>
<ul>
  <li><strong>Matin (environ 7 h 00 – 9 h 00)</strong> — Le matin offre des températures plus fraîches, une lumière plus douce et une consommation d'énergie réduite. L'atmosphère est calme, fraîche et en accord avec les rythmes naturels.</li>
  <li><strong>Fin d'après-midi (environ 16 h 30 – 18 h 00)</strong> — La fin d'après-midi offre une lumière naturelle chaude et une atmosphère détendue tout en limitant le besoin d'éclairage artificiel.</li>
</ul>
<p>Les cérémonies du matin sont généralement privilégiées pour leur moindre impact environnemental et des conditions plus stables. L'horaire définitif sera confirmé en fonction des conditions de lumière naturelle, des considérations environnementales, des directives du lieu, ainsi que du confort et de l'approche de durabilité d'ensemble.</p>`,
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
    title: "Elopements Sacrés ou Spirituels",
    description: `<p>Les Elopements Sacrés ou Spirituels sont conçus pour les couples attirés par le silence, l'intention et les moments de recueillement. Ces cérémonies sont centrées sur l'émotion plutôt que sur la culture, guidées par la croyance personnelle, le sens partagé et la clarté intérieure plutôt que par la tradition formelle.</p>

<p>Dans un cadre naturel paisible ou des espaces architecturaux intimes, la célébration se déroule avec simplicité et profondeur. Elle peut inclure des vœux privés, la formulation d'intentions, des bénédictions silencieuses ou des gestes symboliques tels que l'allumage de bougies, un doux rituel de l'eau ou un moment de méditation partagé.</p>

<blockquote><p>Ici, la spiritualité n'est pas une performance. Elle est personnelle, intérieure et discrètement profonde. Un moment de silence. Une intention partagée. Et un vœu tenu doucement dans le silence.</p></blockquote>

<p>Linda Wiryani Design and Event Planning travaille en étroite collaboration avec chaque couple pour façonner une cérémonie qui reflète ses valeurs et son parcours émotionnel. La structure est flexible et n'exige l'adhésion à aucun cadre religieux ou culturel particulier. Chaque détail est choisi avec sensibilité, respect et authenticité.</p>

<h3>Ce qui est inclus</h3>

<h4>Conception et coordination de la cérémonie</h4>
<ul>
  <li>Planification de la cérémonie de mariage et coordination le jour J par Linda Wiryani Design &amp; Event Planning (1 personne)</li>
  <li>Célébrant ou facilitateur parlant anglais</li>
  <li>Certificat de mariage commémoratif conçu sur mesure, en souvenir</li>
  <li>Frais d'accès au lieu inclus (le cas échéant, dans le cadre du lieu choisi)</li>
</ul>

<h4>Structure de la cérémonie</h4>
<ul>
  <li>Accompagnement pour les vœux personnels et conception du déroulé de la cérémonie</li>
  <li>Éléments symboliques facultatifs (allumage de bougies, formulation d'intentions ou simple rituel de l'eau)</li>
  <li>Texte de cérémonie soigneusement élaboré en accord avec les convictions du couple</li>
</ul>

<h4>Décoration florale <em>(Fleurs locales | Raffinée et subtile)</em></h4>
<ul>
  <li>Décoration de la cérémonie avec un mélange harmonieux de fleurs fraîches d'origine locale, de verdure naturelle et de quelques éléments artificiels choisis, composée avec retenue et un équilibre discret</li>
  <li>Bouquet de la mariée en fleurs locales</li>
  <li>Boutonnière du marié assortie à l'ensemble de la palette</li>
</ul>

<h4>Musique <em>(Méditative et minimale)</em></h4>
<ul>
  <li>Bain sonore (par exemple bols tibétains ou bols de cristal), ou</li>
  <li>Douce flûte de bambou (suling), ou</li>
  <li>Rindik, instrument de musique traditionnel balinais fabriqué principalement en bambou, ou</li>
  <li>Silence naturel, laissant l'environnement devenir le paysage sonore</li>
</ul>
<p><em>La musique est volontairement discrète afin que la cérémonie reste calme, présente et intérieure.</em></p>

<h4>Photographie</h4>
<ul>
  <li>Photographe professionnel pendant 1,5 heure (1 personne)</li>
  <li>Sélection des meilleures images, soigneusement choisies et retouchées</li>
  <li>Livraison des images finales sous 1 semaine via un lien Google Drive privé</li>
</ul>

<h3>Notes importantes</h3>
<ul>
  <li>Ce forfait est volontairement conçu pour rester simple, élégant et centré sur la présence émotionnelle</li>
  <li>Seuls les éléments listés ci-dessus sont inclus</li>
  <li>L'horaire de la cérémonie sera confirmé en fonction du lieu choisi et de l'atmosphère souhaitée</li>
  <li>Le petit matin ou les heures de lumière douce du jour sont souvent recommandés pour favoriser le calme, la clarté et la concentration</li>
  <li>Les Elopements Sacrés et Spirituels sont personnels et universels par nature, et ne sont liés à aucune religion ni à aucun cadre culturel particulier</li>
  <li>Tarifs du forfait à partir de <strong>30 000 000 IDR</strong></li>
  <li>Ce forfait est conçu pour un couple uniquement</li>
</ul>

<h3>Non inclus</h3>
<p>Les éléments suivants peuvent être organisés séparément sur demande : hébergement ou séjour, transport, système de sonorisation ou équipement audio supplémentaire (si nécessaire au-delà de l'approche minimale), vidéographie ou drone, musiciens supplémentaires ou facilitateurs de cérémonie, coiffure et maquillage, robe de mariée, costumes ou accessoires, répétitions impliquant l'ensemble des prestataires, ainsi que tout élément non expressément mentionné sous « Ce qui est inclus ».</p>

<h3>Météo et conditions naturelles</h3>
<p>Les Elopements Sacrés et Spirituels peuvent se dérouler en extérieur comme en semi-extérieur et sont donc influencés par les conditions naturelles. Les conditions peuvent inclure une pluie soudaine ou un temps changeant, le vent ou les mouvements naturels de l'environnement, ainsi que des variations de lumière et de température selon le lieu.</p>
<p>Ces cérémonies étant conçues pour rester flexibles et réactives, les conditions environnementales sont accueillies comme une part de l'expérience. En cas de météo défavorable, la cérémonie peut se dérouler comme prévu lorsque cela est possible en toute sécurité, être brièvement suspendue le temps que les conditions se calment, être déplacée vers une zone abritée ou intérieure si disponible, ou voir certains éléments simplifiés afin de préserver le calme et la continuité.</p>
<p>Le couple reconnaît que les conditions naturelles sont inhérentes au cadre et ne constituent pas un motif d'annulation, de remboursement ou de report, sauf accord contraire écrit.</p>

<h3>Conditions de paiement et de réservation</h3>
<ul>
  <li>Un acompte non remboursable de 50 % est exigé à la confirmation de la réservation</li>
  <li>Le solde de 50 % doit être réglé au plus tard 30 jours avant la date de l'événement</li>
  <li>La date de l'événement n'est pas considérée comme réservée tant que l'acompte n'a pas été reçu</li>
  <li>Tous les paiements effectués sont non remboursables, sauf mention contraire écrite</li>
  <li>Le défaut de paiement du solde dans le délai convenu peut entraîner l'annulation des services sans remboursement de l'acompte initial</li>
  <li>Toute modification demandée concernant la date de la cérémonie, le lieu ou la structure après confirmation est soumise aux disponibilités et peut entraîner des frais supplémentaires selon les ajustements nécessaires</li>
  <li>Les frais d'accès au lieu et les éventuels permis applicables suivent les règles de chaque site</li>
</ul>

<h3>Le moment idéal</h3>
<p>Les Elopements Sacrés et Spirituels se vivent au mieux à des moments qui favorisent le calme, la concentration et la présence émotionnelle.</p>
<ul>
  <li><strong>Matin (environ 7 h 00 – 9 h 00)</strong> — Le matin offre le silence, la clarté et un environnement paisible. L'atmosphère est fraîche, ancrée et ininterrompue — idéale pour le recueillement intérieur et les moments d'intention.</li>
  <li><strong>Fin d'après-midi (environ 16 h 30 – 18 h 00)</strong> — La fin d'après-midi offre une lumière plus douce et une douce transition vers la soirée, créant une atmosphère chaleureuse et propice à la réflexion.</li>
</ul>
<p>Les cérémonies du matin sont généralement recommandées pour un silence plus profond et un minimum de distractions extérieures. L'horaire définitif sera guidé par la tonalité émotionnelle souhaitée de la cérémonie, les conditions de lumière naturelle, le calme de l'environnement, ainsi que le cadre et l'accessibilité du lieu.</p>`,
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
    title: "Cérémonies d'Inspiration Culturelle et Patrimoniale",
    description: `<p>Les Cérémonies d'Inspiration Culturelle et Patrimoniale sont conçues pour les couples qui souhaitent honorer la tradition d'une manière raffinée, porteuse de sens et personnellement pertinente. Ces cérémonies ne se définissent pas par une formalité rigide, mais par une interprétation réfléchie — où les éléments culturels sont soigneusement sélectionnés, adaptés avec respect et intégrés harmonieusement à une célébration contemporaine.</p>

<p>Dans des lieux sélectionnés, des villas privées aux espaces d'inspiration patrimoniale, la cérémonie se déroule avec intention, symbolisme et une révérence discrète.</p>

<blockquote><p>Ici, la tradition n'est pas représentée dans son intégralité. Elle est distillée, affinée et exprimée avec clarté et respect. Un geste chargé de sens. Un sentiment d'héritage. Et un moment qui relie le passé et le présent.</p></blockquote>

<p>Linda Wiryani Design and Event Planning aborde chaque cérémonie culturelle avec sensibilité et attention, en veillant à ce que chaque élément soit à la fois authentique et correctement contextualisé. Les références culturelles peuvent être balinaises, indonésiennes ou inspirées de l'héritage propre au couple.</p>

<h3>Ce qui est inclus</h3>

<h4>Conception et coordination de la cérémonie</h4>
<ul>
  <li>Planification de la cérémonie de mariage et coordination le jour J par Linda Wiryani Design &amp; Event Planning (1 personne)</li>
  <li>Célébrant ou facilitateur culturel parlant anglais (le cas échéant)</li>
  <li>Certificat de mariage commémoratif conçu sur mesure, en souvenir</li>
  <li>Frais d'accès au lieu inclus (le cas échéant)</li>
</ul>

<h4>Éléments de cérémonie culturelle <em>(Sélectionnés et raffinés)</em></h4>
<ul>
  <li>Accompagnement pour choisir des éléments culturels ou symboliques significatifs</li>
  <li>Déroulé de cérémonie simplifié et soigneusement composé</li>
  <li>Intégration facultative de gestes traditionnels (adaptés dans le respect), tels que des rituels de bénédiction, des éléments d'offrande et des échanges symboliques</li>
  <li>Coordination avec des praticiens culturels locaux lorsque cela est approprié</li>
</ul>

<h4>Décoration florale <em>(Fleurs locales | Raffinée et contextuelle)</em></h4>
<ul>
  <li>Décoration de la cérémonie avec un mélange harmonieux de fleurs fraîches d'origine locale, de verdure naturelle et de quelques éléments artificiels choisis</li>
  <li>Design adapté pour refléter la tonalité culturelle tout en préservant l'esthétique raffinée de Linda Wiryani Design and Event Planning</li>
  <li>Bouquet de la mariée en fleurs locales</li>
  <li>Boutonnière du marié assortie à l'ensemble de la palette</li>
</ul>

<h4>Musique <em>(Subtile et contextuelle)</em></h4>
<ul>
  <li>Musique traditionnelle ou instrumentale douce lorsque cela est approprié, ou accompagnement moderne minimal en accord avec le ton de la cérémonie</li>
</ul>
<p><em>La musique est choisie pour soutenir l'atmosphère sans couvrir la cérémonie.</em></p>

<h4>Photographie</h4>
<ul>
  <li>Photographe professionnel pendant 1,5 heure (1 personne)</li>
  <li>Sélection des meilleures images, soigneusement choisies et retouchées</li>
  <li>Livraison des images finales sous 1 semaine via un lien Google Drive privé</li>
</ul>

<h3>Notes importantes</h3>
<ul>
  <li>Ce forfait est volontairement conçu pour rester raffiné, respectueux et sans excès de cérémonial</li>
  <li>Seuls certains éléments culturels choisis seront intégrés, plutôt que des rituels traditionnels complets</li>
  <li>La cérémonie est adaptée au confort du couple, à son système de croyances et à son niveau d'engagement culturel</li>
  <li>La sensibilité et la justesse culturelles sont prioritaires en tout temps</li>
  <li>Tarifs du forfait à partir de <strong>35 000 000 IDR</strong></li>
  <li>Ce forfait est conçu pour un couple uniquement</li>
</ul>

<h3>Non inclus</h3>
<p>Les éléments suivants peuvent être organisés séparément sur demande : cérémonies traditionnelles ou religieuses complètes, rituels cérémoniels étendus nécessitant plusieurs officiants, coiffure et maquillage, tenues traditionnelles (kebaya, kain et/ou sarong, accessoires), artistes culturels supplémentaires, hébergement ou séjour, transport, vidéographie ou drone, ainsi que tout élément non expressément mentionné sous « Ce qui est inclus ».</p>

<h3>Météo et conditions naturelles</h3>
<p>Les Cérémonies d'Inspiration Culturelle et Patrimoniale peuvent se dérouler en extérieur ou en semi-extérieur et sont donc soumises aux conditions naturelles. La météo, la lumière et les facteurs environnementaux échappent au contrôle du Planner. En cas de météo défavorable, la cérémonie peut se dérouler comme prévu lorsque cela est possible en toute sécurité, être brièvement suspendue ou déplacée vers un espace couvert ou intérieur si disponible, ou voir certains éléments cérémoniels simplifiés ou adaptés. Les conditions météorologiques ne constituent pas un motif d'annulation, de remboursement ou de report, sauf accord contraire écrit.</p>

<h3>Le moment idéal</h3>
<p>Les cérémonies culturelles se vivent au mieux dans des moments de calme et d'équilibre naturels.</p>
<ul>
  <li><strong>Matin (environ 7 h 00 – 9 h 00)</strong> — Une lumière douce et une atmosphère paisible favorisent une cérémonie respectueuse et ancrée.</li>
  <li><strong>Fin d'après-midi (environ 16 h 30 – 18 h 00)</strong> — Des tons chauds créent un cadre plus atmosphérique et visuellement riche.</li>
</ul>
<p>L'horaire définitif sera guidé par le déroulé culturel de la cérémonie, les conditions de lumière, le cadre du lieu et l'atmosphère générale.</p>`,
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
    title: "Moments du Lever du Soleil ou de Purification",
    description: `<p>Les Moments du Lever du Soleil ou de Purification sont conçus pour les couples attirés par le renouveau, la clarté et les débuts paisibles. Ces cérémonies sont façonnées par la douce transition de la lumière ou par le geste symbolique de la purification, marquant un seuil significatif vers un nouveau chapitre.</p>

<p>Au petit matin ou dans des cadres aquatiques sereins, ces expériences se déroulent avec une intention calme, une lumière adoucie et un sentiment de renouveau émotionnel.</p>

<blockquote><p>Ici, le moment ne se définit pas par son ampleur. Il se définit par la présence, le calme et une transformation discrète. La première lumière. Une eau immobile. Et un commencement tenu doucement dans le calme.</p></blockquote>

<p>Linda Wiryani Design and Event Planning aborde ces cérémonies avec sensibilité et retenue — en laissant de la place à la réflexion, à l'ancrage et à des gestes symboliques personnels et naturels.</p>

<h3>Ce qui est inclus</h3>

<h4>Conception et coordination de la cérémonie</h4>
<ul>
  <li>Planification de la cérémonie de mariage et coordination le jour J par Linda Wiryani Design &amp; Event Planning (1 personne)</li>
  <li>Célébrant ou facilitateur parlant anglais</li>
  <li>Certificat de mariage commémoratif conçu sur mesure, en souvenir</li>
  <li>Frais d'accès au lieu inclus (le cas échéant, dans le cadre du lieu choisi)</li>
</ul>

<h4>Structure de la cérémonie <em>(Renouveau et intention)</em></h4>
<ul>
  <li>Déroulé de cérémonie guidé, centré sur les commencements, la réflexion et la formulation d'intentions</li>
  <li>Éléments symboliques facultatifs tels qu'une douce purification par l'eau ou un rituel de nettoyage, un moment de réflexion silencieuse ou de méditation, et un échange de vœux personnels ou la formulation d'intentions</li>
  <li>Texte de cérémonie soigneusement élaboré en accord avec le parcours émotionnel du couple</li>
</ul>

<h4>Décoration florale <em>(Fleurs locales | Légère et minimale)</em></h4>
<ul>
  <li>Décoration de la cérémonie avec un mélange raffiné de fleurs fraîches d'origine locale, de verdure naturelle et de quelques éléments artificiels choisis</li>
  <li>Conçue avec légèreté et retenue pour s'accorder avec la douceur du matin ou des cadres aquatiques</li>
  <li>Bouquet de la mariée en fleurs locales</li>
  <li>Boutonnière du marié assortie à l'ensemble de la palette</li>
</ul>

<h4>Musique <em>(Douce et réflexive)</em></h4>
<ul>
  <li>Bain sonore (par exemple bols tibétains ou bols de cristal), ou</li>
  <li>Douce flûte de bambou (suling), ou</li>
  <li>Rindik, instrument de musique traditionnel balinais fabriqué principalement en bambou, ou</li>
  <li>Silence naturel, laissant l'environnement façonner le paysage sonore</li>
</ul>
<p><em>La musique reste minimale et discrète.</em></p>

<h4>Photographie</h4>
<ul>
  <li>Photographe professionnel pendant 1,5 heure (1 personne)</li>
  <li>Sélection des meilleures images, soigneusement choisies et retouchées</li>
  <li>Livraison des images finales sous 1 semaine via un lien Google Drive privé</li>
</ul>

<h3>Notes importantes</h3>
<ul>
  <li>Ce forfait est volontairement conçu pour rester calme, minimal et centré sur l'émotion</li>
  <li>Seuls les éléments listés ci-dessus sont inclus</li>
  <li>L'horaire de la cérémonie est essentiel à l'expérience et sera soigneusement planifié autour du lever du soleil ou de moments de lumière du jour paisibles</li>
  <li>Les éléments de purification sont symboliques et adaptés dans le respect, sans exiger de cérémonie religieuse complète sauf demande contraire</li>
  <li>L'expérience est conçue pour paraître personnelle, ancrée et sans précipitation</li>
  <li>Tarifs du forfait à partir de <strong>35 000 000 IDR</strong></li>
  <li>Ce forfait est conçu pour un couple uniquement</li>
</ul>

<h3>Non inclus</h3>
<p>Les éléments suivants peuvent être organisés séparément sur demande : hébergement ou séjour, transport (des arrangements très tôt le matin peuvent être nécessaires), système de sonorisation ou équipement audio supplémentaire, vidéographie ou drone, facilitateurs ou officiants de cérémonie supplémentaires, coiffure et maquillage, tenues ou stylisme de mariage, répétitions impliquant l'ensemble des prestataires, ainsi que tout élément non expressément mentionné sous « Ce qui est inclus ».</p>

<h3>Météo et conditions naturelles</h3>
<p>Les cérémonies du lever du soleil ou de purification se déroulent souvent dans des environnements extérieurs ou aquatiques et sont soumises aux conditions naturelles. Les conditions peuvent inclure de la brume matinale ou une faible visibilité, des changements météorologiques soudains, des températures plus fraîches, l'état de l'eau selon le lieu, ainsi que le terrain naturel et l'accessibilité.</p>
<p>Ces cérémonies étant guidées par le rythme et l'environnement naturels, les conditions échappent à notre contrôle. En cas de météo défavorable, la cérémonie peut se dérouler lorsque cela est possible en toute sécurité, être brièvement suspendue le temps que les conditions s'améliorent, être déplacée vers une zone abritée voisine si disponible, ou voir certains éléments symboliques simplifiés ou ajustés.</p>
<p>Le couple reconnaît que les conditions naturelles sont inhérentes à l'expérience et ne constituent pas un motif d'annulation, de remboursement ou de report, sauf accord contraire écrit.</p>

<h3>Conditions de paiement et de réservation</h3>
<ul>
  <li>Un acompte non remboursable de 50 % est exigé à la confirmation</li>
  <li>Le solde de 50 % doit être réglé au plus tard 30 jours avant la date de l'événement</li>
  <li>La date de l'événement n'est pas considérée comme réservée tant que l'acompte n'a pas été reçu</li>
  <li>Tous les paiements effectués sont non remboursables, sauf mention contraire écrite</li>
  <li>Le défaut de paiement dans le délai convenu peut entraîner l'annulation des services sans remboursement</li>
  <li>Toute modification demandée concernant l'horaire de la cérémonie, le lieu ou la structure après confirmation est soumise aux disponibilités et peut entraîner des frais supplémentaires selon les ajustements nécessaires</li>
  <li>L'accès au lieu et les permis (le cas échéant) suivent les règles de chaque site</li>
</ul>

<h3>Le moment idéal</h3>
<p>L'horaire est au cœur de cette expérience.</p>
<ul>
  <li><strong>Lever du soleil (environ 6 h 00 – 7 h 30)</strong> — L'horaire le plus recommandé. La lumière est douce, l'atmosphère immobile et l'environnement calme et préservé. Cela crée le cadre le plus propice à la réflexion et au renouveau.</li>
  <li><strong>Petit matin (jusqu'à 9 h 00)</strong> — Toujours adapté aux cérémonies calmes, même si la lumière devient plus vive et que l'activité peut progressivement augmenter.</li>
</ul>
<p>Le lever du soleil est fortement recommandé pour un maximum de calme et d'intimité, une lumière naturelle douce et diffuse, une forte atmosphère émotionnelle et un accord avec le thème symbolique du renouveau. L'horaire définitif sera guidé par les variations de l'heure du lever du soleil, l'accessibilité du lieu, les conditions environnementales et la tonalité émotionnelle souhaitée.</p>`,
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
    title: "Un Récit Éditorial, Pourtant Profondément Humain",
    description: `<p>Chez Linda Wiryani Design and Event Planning, nous créons à Bali des elopements de luxe qui ressemblent à un éditorial magnifiquement composé — tout en restant profondément personnels et authentiquement émouvants. En tant que wedding planner et designer d'elopements à Bali, notre travail puise dans la mode, le design et l'hospitalité cinq étoiles. Chaque célébration est pensée avec une direction artistique soignée, alliant esthétique raffinée et véritable connexion humaine.</p>

<blockquote><p>Chaque détail est intentionnel. Chaque instant est soigneusement composé. Et pourtant, rien ne paraît mis en scène ni distant. Notre approche des mariages en elopement à Bali est de créer une atmosphère qui semble naturelle et vécue — élégante mais chaleureuse ; visuellement raffinée mais émotionnellement sincère.</p></blockquote>

<p>Chaque elopement Linda Wiryani Design and Event Planning à Bali n'est jamais défini par les tendances, mais par le lieu, l'émotion et l'intention. Des villas privées d'Uluwatu aux paysages sereins d'Ubud, en passant par des cadres côtiers cachés à travers Bali — chaque mariage est soigneusement conçu pour paraître intemporel plutôt qu'éphémère. Beau, composé et toujours sincère sur le plan émotionnel.</p>

<h3>Nos expériences d'elopement comprennent</h3>
<ul>
  <li><strong>Elopements éditoriaux ou avant-gardistes à Bali</strong> — Elopements de couture conçus avec une forte direction visuelle, idéaux pour les couples en quête d'un mariage raffiné de style éditorial à Bali.</li>
  <li><strong>Elopements intimes façon maison</strong> — Rassemblements chaleureux et personnels conçus autour de la proximité, du confort et d'un déroulé naturel.</li>
  <li><strong>Elopements de luxe discret à Bali</strong> — Célébrations sobres et sophistiquées où la beauté s'exprime par le ton, la texture et l'émotion — une signature des mariages de luxe modernes à Bali.</li>
</ul>

<h3>Ce qui est inclus</h3>

<h4>Conception et coordination de la cérémonie</h4>
<ul>
  <li>Planification de la cérémonie de mariage et coordination le jour J (1 personne)</li>
  <li>Célébrant local parlant anglais</li>
  <li>Certificat de mariage commémoratif conçu sur mesure</li>
  <li>Coordination de l'accès au lieu (accès de base uniquement)</li>
</ul>

<h4>Décoration florale <em>(Composition raffinée et naturelle)</em></h4>
<ul>
  <li>Fond de cérémonie en fleurs d'origine locale, verdure et quelques éléments artificiels choisis</li>
  <li>Compositions florales d'allée au mouvement organique et naturel</li>
  <li>Pétales de fleurs le long de l'allée de la cérémonie</li>
  <li>Bouquet de la mariée et boutonnière du marié</li>
</ul>

<h4>Musique</h4>
<ul>
  <li>Guitariste solo ou violoniste solo pour une cérémonie intime et pleine d'atmosphère</li>
</ul>

<h4>Photographie</h4>
<ul>
  <li>Photographe professionnel (2 heures, 1 personne)</li>
  <li>Sélection des meilleures images retouchées</li>
  <li>Livraison sous 7 jours via une galerie en ligne privée</li>
</ul>

<h3>Notes importantes</h3>
<ul>
  <li>Cette expérience est volontairement conçue pour rester simple, raffinée et centrée sur le moment de la cérémonie lui-même</li>
  <li>Seuls les éléments listés ci-dessus sont inclus</li>
  <li>Tous les éléments supplémentaires peuvent être organisés sur demande</li>
  <li>L'horaire de la cérémonie sera confirmé en fonction de la lumière naturelle, des conditions du lieu et de la fluidité environnementale générale</li>
  <li>Tarifs du forfait à partir de <strong>35 000 000 IDR</strong></li>
  <li>Ce forfait est conçu pour un couple uniquement</li>
</ul>

<h3>Non inclus</h3>
<p>Disponibles sur demande avec supplément : frais de lieu ou de site (si nécessaires), hébergement, transport, système de sonorisation ou installation audio supplémentaire, vidéographie ou drone, musiciens ou animation supplémentaires, coiffure et maquillage, tenues et accessoires de mariage, ainsi que répétitions avec l'ensemble de l'équipe de prestataires.</p>

<h3>Météo et conditions naturelles</h3>
<p>Les elopements en plein air et en bord de rivière à Bali sont influencés par des éléments naturels tels que la météo, l'humidité, le débit de l'eau et le terrain. En cas de pluie ou de conditions changeantes, la cérémonie peut être brièvement suspendue, des ajustements peuvent être apportés au positionnement ou à l'installation, et la décoration peut être affinée afin de garantir la sécurité et la cohésion. Aucun repli intérieur fixe n'est garanti, sauf s'il est proposé par le lieu. Ces conditions naturelles font partie de l'expérience et ne sont pas considérées comme un motif d'annulation ou de remboursement.</p>

<h3>Paiement et réservation</h3>
<ul>
  <li>Un acompte non remboursable de 50 % est exigé à la confirmation</li>
  <li>Le solde de 50 % est dû 30 jours avant l'événement</li>
  <li>La date n'est réservée qu'à réception de l'acompte</li>
  <li>Tous les paiements sont non remboursables, sauf accord contraire écrit</li>
  <li>Toute modification de la date, du lieu ou du design après confirmation est soumise aux disponibilités et peut entraîner des coûts supplémentaires</li>
</ul>

<h3>Le moment idéal</h3>
<p>Les elopements sont conçus autour de la lumière naturelle et de l'harmonie avec l'environnement.</p>
<ul>
  <li><strong>Matin (7 h 00 – 9 h 00)</strong> — Lumière douce, température plus fraîche et atmosphère calme et paisible.</li>
  <li><strong>Fin d'après-midi (16 h 30 – 18 h 00)</strong> — Tons chauds, ombres plus douces et cadre plus atmosphérique.</li>
</ul>
<p>L'horaire définitif sera guidé par la direction de la lumière, les conditions météorologiques, l'état du lieu, ainsi que le confort et la sécurité généraux.</p>`,
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
    title: "Mariages en Domaine de Villa Privée",
    description: `<p>Accueillez vos proches les plus chers dans un domaine de villa exclusif à l'architecture saisissante et aux jardins impeccablement entretenus. Les Mariages en Domaine de Villa Privée sont conçus pour les couples qui désirent une célébration raffinée et sans précipitation, entièrement à eux — où chaque détail du lieu s'accorde à la cérémonie.</p>

<p>Ces cadres offrent une intimité totale, des possibilités de décoration sur mesure et une atmosphère façonnée par l'architecture et le paysage du domaine lui-même. Qu'elle soit nichée dans des jardins tropicaux ou ouverte sur des vues panoramiques, chaque villa devient un décor vivant pour votre journée la plus importante.</p>`,
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
    title: "Mariages Intimes en Resort de Luxe",
    description: `<p>Vivez une hospitalité de classe mondiale et des lieux à couper le souffle au sein de prestigieux établissements hôteliers. Les Mariages Intimes en Resort de Luxe sont conçus pour les couples qui souhaitent la facilité et le raffinement d'un cadre de classe mondiale — sans l'ampleur d'un grand événement.</p>

<p>Ces célébrations se déroulent dans des resorts soigneusement sélectionnés, dotés d'installations dédiées aux mariages, d'un personnel événementiel professionnel et d'une restauration haut de gamme. Des pavillons en bord de mer aux terrasses en surplomb des falaises, chaque lieu apporte son caractère propre à votre célébration.</p>`,
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
    title: "Mariages au Jardin et en Bord de Rivière",
    description: `<p>Célébrez au milieu de fleurs épanouies et d'eaux vives, dans de paisibles jardins naturels. Les Mariages au Jardin et en Bord de Rivière embrassent les rythmes doux du monde naturel — où le murmure de l'eau, la douceur de la verdure et le ciel ouvert s'unissent pour accueillir votre cérémonie dans une beauté tranquille et organique.</p>

<p>Ces célébrations sont façonnées par le paysage lui-même. De luxuriantes pelouses en bord de rivière, des terrasses de jardin fleuries et des pavillons en plein air offrent un cadre à la fois naturellement romantique et ancré dans la nature.</p>`,
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
    title: "Cadres Culturels et Architecturaux",
    description: `<p>Honorez la tradition dans des lieux qui mettent en valeur le riche patrimoine culturel et l'architecture remarquable de Bali. Les Cadres Culturels et Architecturaux sont conçus pour les couples attirés par la profondeur d'un lieu — des célébrations dans des cours de temples, des domaines patrimoniaux et des sites où l'art balinais et la conception des espaces portent leur propre cérémonie silencieuse.</p>

<p>Ces mariages sont façonnés autant par le caractère du lieu que par la vision propre du couple. Les éléments cérémoniels sont soigneusement tissés dans le cadre, pour une célébration enracinée, porteuse de sens et visuellement extraordinaire.</p>`,
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
    title: "Célébrations Intimes en Destination",
    description: `<p>Créez des souvenirs inoubliables dans des lieux de destination uniques qui mettent parfaitement en valeur votre histoire d'amour. Les Célébrations Intimes en Destination sont conçues pour les couples qui choisissent de voyager — pour célébrer dans un endroit chargé de sens, de beauté et d'un sentiment d'arrivée.</p>

<p>Ces mariages ont lieu dans des sites choisis pour leur cadre panoramique, leur caractère distinctif et le sentiment qu'ils procurent à l'arrivée. Qu'il soit perché au-dessus de l'océan, niché au cœur de rizières en terrasses ou en surplomb d'un cratère volcanique, chaque lieu devient une part essentielle de votre histoire.</p>`,
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
    title: "Mariages Intimes en Jungle ou en Forêt",
    description: `<p>Célébrez votre union sous des arbres centenaires, dans une enchanteresse cathédrale de verdure naturelle. Les Mariages Intimes en Jungle ou en Forêt se déroulent dans les paysages intérieurs luxuriants de Bali — où les canopées majestueuses, la lumière filtrée et la présence tranquille de la nature forment un cadre sans égal.</p>

<p>Ces cérémonies embrassent la beauté sauvage de l'environnement forestier. Le bruissement des feuilles, le soleil tamisé à travers la canopée et la verdure environnante créent une atmosphère à la fois primitive, poétique et profondément vivante.</p>`,
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
