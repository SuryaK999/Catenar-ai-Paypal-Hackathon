export interface CatalogProduct {
  id: string;
  sku: string;
  title: string;
  brand: string;
  category: string;
  quotedUnitCents: number;
  liveVerifiedUnitCents: number;
  imageUrl: string;
  stockAvailability: boolean;
}

export const CATALOG_SNAPSHOT_ITEMS: CatalogProduct[] = [
  {
    id: 'ch3_prod_red_vraptor',
    sku: 'RED-VRAPTOR-8K-VV',
    title: 'RED Digital Cinema V-Raptor 8K VV Cinema Camera Body',
    brand: 'RED Digital Cinema',
    category: 'Camera Hardware',
    quotedUnitCents: 320000,
    liveVerifiedUnitCents: 325000,
    imageUrl: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&q=80',
    stockAvailability: true,
  },
  {
    id: 'ch3_prod_arri_ultra35',
    sku: 'ARRI-UP-35MM-T19',
    title: 'ARRI Ultra Prime 35mm T1.9 PL Mount Cine Lens',
    brand: 'ARRI',
    category: 'Optical Equipment',
    quotedUnitCents: 65000,
    liveVerifiedUnitCents: 66000,
    imageUrl: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?w=400&q=80',
    stockAvailability: true,
  },
  {
    id: 'ch3_prod_aputure_600d',
    sku: 'APT-LS-600D-PRO',
    title: 'Aputure LS 600d Pro Daylight LED Monolight System',
    brand: 'Aputure',
    category: 'Studio Lighting',
    quotedUnitCents: 27000,
    liveVerifiedUnitCents: 27000,
    imageUrl: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=400&q=80',
    stockAvailability: true,
  },
  {
    id: 'ch3_prod_senn_mkh416',
    sku: 'SENN-MKH-416-P48',
    title: 'Sennheiser MKH 416-P48 Moisture-Resistant Shotgun Mic',
    brand: 'Sennheiser',
    category: 'Sound Recording',
    quotedUnitCents: 38000,
    liveVerifiedUnitCents: 38000,
    imageUrl: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=400&q=80',
    stockAvailability: true,
  },
];
