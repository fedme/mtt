export const CONDITIONS = [
  { "training": "active", "testing": ["comparison", "estimation"] },
  { "training": "passive", "testing": ["comparison", "estimation"] },
  { "training": "active", "testing": ["estimation", "comparison"] },
  { "training": "passive", "testing": ["estimation", "comparison"] }
];

export const NUMBERS = {
  TRAINING_CARDS: 27,
  PAIR_COMPARISONS: 8,
  OUTPUT_ESTIMATION_EXTRAPOLATION: 8,
  OUTPUT_ESTIMATION_INTERPOLATION: 5,
  OUTPUT_ESTIMATION_RECALL: 5
}

export const PAIR_COMPARISONS = [
  [ [4,2,2], [3,4,4] ],
  [ [3,2,2], [2,4,4] ],
  [ [1,4,1], [2,1,2] ],
  [ [2,2,2], [3,1,1] ],
  [ [1,1,4], [2,1,1] ],
  [ [3,2,2], [2,2,2] ],
  [ [2,3,2], [2,2,2] ],
  [ [2,2,3], [2,2,2] ],
];

