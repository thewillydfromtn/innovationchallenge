export const OFFICE_BEATS = Object.freeze({
  Opening: 'opening',
  AfterActI: 'after-act-i',
  AfterActII: 'after-act-ii',
  AfterActIII: 'after-act-iii',
  AfterActIV: 'after-act-iv',
  AfterActV: 'after-act-v',
  AfterActVI: 'after-act-vi',
  Final: 'final',
});

const OFFICE_IMAGES = Object.freeze({
  [OFFICE_BEATS.Opening]: 'assets/master-office-reference.png',
  [OFFICE_BEATS.AfterActI]: 'assets/master-office-reference.png',
  [OFFICE_BEATS.AfterActII]: 'assets/master-office-reference.png',
  [OFFICE_BEATS.AfterActIII]: 'assets/master-office-reference.png',
  [OFFICE_BEATS.AfterActIV]: 'assets/master-office-reference.png',
  [OFFICE_BEATS.AfterActV]: 'assets/master-office-reference.png',
  [OFFICE_BEATS.AfterActVI]: 'assets/master-office-reference.png',
  [OFFICE_BEATS.Final]: 'assets/master-final-act-reference.png',
});

export const DEFAULT_OFFICE_DURATION = 4500;
export const DEFAULT_PRESENTATION_DURATION = 0;

export const FILM_SEQUENCE = Object.freeze([
  { type: 'office', id: OFFICE_BEATS.Opening, label: 'Opening office image' },
  { type: 'presentation', id: 'act1', path: 'film/act1/index.html', duration: DEFAULT_PRESENTATION_DURATION, enabled: false },
  { type: 'office', id: OFFICE_BEATS.AfterActI, label: 'Office image after Act I' },
  { type: 'presentation', id: 'act2', path: 'film/act2/index.html', duration: DEFAULT_PRESENTATION_DURATION, enabled: false },
  { type: 'office', id: OFFICE_BEATS.AfterActII, label: 'Office image after Act II' },
  { type: 'presentation', id: 'act3', path: 'film/act3/index.html', duration: DEFAULT_PRESENTATION_DURATION, enabled: false },
  { type: 'office', id: OFFICE_BEATS.AfterActIII, label: 'Office image after Act III' },
  { type: 'presentation', id: 'act4', path: 'film/act4/index.html', duration: DEFAULT_PRESENTATION_DURATION, enabled: false },
  { type: 'office', id: OFFICE_BEATS.AfterActIV, label: 'Office image after Act IV' },
  { type: 'presentation', id: 'act5', path: 'film/act5/index.html', duration: DEFAULT_PRESENTATION_DURATION, enabled: false },
  { type: 'office', id: OFFICE_BEATS.AfterActV, label: 'Office image after Act V' },
  { type: 'presentation', id: 'act6', path: 'film/act6/index.html', duration: DEFAULT_PRESENTATION_DURATION, enabled: false },
  { type: 'office', id: OFFICE_BEATS.AfterActVI, label: 'Office image after Act VI' },
  { type: 'presentation', id: 'act7', path: 'film/act7/index.html', duration: DEFAULT_PRESENTATION_DURATION, enabled: false },
  { type: 'office', id: OFFICE_BEATS.Final, label: 'Final office image' },
  { type: 'credits', id: 'credits', duration: 3000 },
]);

export const loadOfficeBeat = (beatId) => {
  const image = OFFICE_IMAGES[beatId];

  if (!image) {
    throw new Error(`Office beat "${beatId}" is not configured.`);
  }

  return {
    id: beatId,
    image,
    duration: DEFAULT_OFFICE_DURATION,
    pushScale: 1.06,
  };
};
