export interface GetGunResults {
  info: Info;
  results: Gun[];
}

export interface Info {
  count: number;
  pages: number;
  next: string;
  prev: null;
}

export interface Gun {
  id: string;
  name: string;
  ammo: string;
  killAward: string;
  damage: number;
  firerate: number;
  recoilControl: number;
  accurateRange: string;
  armorPenetration: number;
  type: string;
  side: string;
  price: number;
  picture: string;
  created_at: string;
  updated_at: string;
}
