import { atomWithStorage } from 'jotai/utils';

export const themeAtom = atomWithStorage("data-theme", "light");