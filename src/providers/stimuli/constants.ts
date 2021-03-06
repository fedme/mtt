export const TESTS_ORDER: string[][] = [
  ["comparison", "estimation"],
  ["estimation", "comparison"]
];

export const ONLINE_DEFAULT_CONDITION: {trainingTasks: number, func: number, training: string, testingOrder: number} = {"trainingTasks": 22, "func": 1, "training": "active", "testingOrder": 0};

export const CONDITIONS: {trainingTasks: number, func: number, training: string, testingOrder: number}[] = [
  {"trainingTasks": 22, "func": 1, "training": "active", "testingOrder": 0},
  {"trainingTasks": 22, "func": 1, "training": "passive", "testingOrder": 0},
  {"trainingTasks": 22, "func": 1, "training": "active", "testingOrder": 1},
  {"trainingTasks": 22, "func": 1, "training": "passive", "testingOrder": 1}
];

export const CONDITIONS_ACTIVE_ONLY: {trainingTasks: number, func: number, training: string, testingOrder: number}[] = [
  {"trainingTasks": 22, "func": 1, "training": "active", "testingOrder": 0},
  {"trainingTasks": 22, "func": 1, "training": "active", "testingOrder": 1}
];

export const CONDITIONS_EXTENDED: {trainingTasks: number, func: number, training: string, testingOrder: number}[] = [
  {"trainingTasks": 22, "func": 1, "training": "active", "testingOrder": 0},
  {"trainingTasks": 22, "func": 1, "training": "active", "testingOrder": 1},
  {"trainingTasks": 22, "func": 1, "training": "passive", "testingOrder": 0},
  {"trainingTasks": 22, "func": 1, "training": "passive", "testingOrder": 1},

  {"trainingTasks": 22, "func": 2, "training": "active", "testingOrder": 0},
  {"trainingTasks": 22, "func": 2, "training": "active", "testingOrder": 1},
  {"trainingTasks": 22, "func": 2, "training": "passive", "testingOrder": 0},
  {"trainingTasks": 22, "func": 2, "training": "passive", "testingOrder": 1},

  {"trainingTasks": 5, "func": 1, "training": "active", "testingOrder": 0},
  {"trainingTasks": 5, "func": 1, "training": "active", "testingOrder": 1},
  {"trainingTasks": 5, "func": 1, "training": "passive", "testingOrder": 0},
  {"trainingTasks": 5, "func": 1, "training": "passive", "testingOrder": 1},

  {"trainingTasks": 5, "func": 2, "training": "active", "testingOrder": 0},
  {"trainingTasks": 5, "func": 2, "training": "active", "testingOrder": 1},
  {"trainingTasks": 5, "func": 2, "training": "passive", "testingOrder": 0},
  {"trainingTasks": 5, "func": 2, "training": "passive", "testingOrder": 1}
];

export const CONDITIONS_EXTENDED_2: {trainingTasks: number, func: number, training: string, testingOrder: number}[] = [
  
  // 1 card linear
  {"trainingTasks": 1, "func": 1, "training": "active", "testingOrder": 0},
  {"trainingTasks": 1, "func": 1, "training": "active", "testingOrder": 1},
  {"trainingTasks": 1, "func": 1, "training": "passive", "testingOrder": 0},
  {"trainingTasks": 1, "func": 1, "training": "passive", "testingOrder": 1},

  // 1 card non linear
  {"trainingTasks": 1, "func": 2, "training": "active", "testingOrder": 0},
  {"trainingTasks": 1, "func": 2, "training": "active", "testingOrder": 1},
  {"trainingTasks": 1, "func": 2, "training": "passive", "testingOrder": 0},
  {"trainingTasks": 1, "func": 2, "training": "passive", "testingOrder": 1},

  // 0 cards
  {"trainingTasks": 0, "func": 1, "training": "passive", "testingOrder": 0},
  {"trainingTasks": 0, "func": 1, "training": "passive", "testingOrder": 1},
  {"trainingTasks": 0, "func": 2, "training": "passive", "testingOrder": 0},
  {"trainingTasks": 0, "func": 2, "training": "passive", "testingOrder": 1},

  // all cards
  {"trainingTasks": 27, "func": 1, "training": "passive", "testingOrder": 0},
  {"trainingTasks": 27, "func": 1, "training": "passive", "testingOrder": 1},
  {"trainingTasks": 27, "func": 2, "training": "passive", "testingOrder": 0},
  {"trainingTasks": 27, "func": 2, "training": "passive", "testingOrder": 1}
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

