# Performance Optimization Report

## Baseline Measurements

### Interaction A: Sort countries

- **Render duration**: 578.6 ms
- **Screenshot**: ![screenshot](screenshots/baseline/Screenshot%202026-06-13%20112528.png)

### Interaction B: Search countries

- **Render duration**: 251.5 ms
- **Screenshot**: ![screenshot](screenshots/baseline/Screenshot%202026-06-13%20113119.png)

### Interaction C: Change year

- **Render duration**: 31.9 ms
- **Screenshot**: ![screenshot](screenshots/baseline/Screenshot%202026-06-13%20112715.png)

### Interaction D: Toggle column

- **Render duration**: 40.5 ms
- **Screenshot**: ![screenshot](screenshots/baseline/Screenshot%202026-06-13%20112807.png)

## Optimized Measurements

### Interaction A: Sort countries

- **Render duration**: 25.9 ms
- **Screenshot**: ![screenshot](screenshots/optimized/Screenshot%202026-06-13%20134528.png)

### Interaction B: Search countries

- **Render duration**: 13.4 ms
- **Screenshot**: ![screenshot](screenshots/optimized/Screenshot%202026-06-13%20134646.png)

### Interaction C: Change year

- **Render duration**: 48.9 ms
- **Screenshot**: ![screenshot](screenshots/optimized/Screenshot%202026-06-13%20134742.png)

### Interaction D: Toggle column

- **Render duration**: 9.7 ms
- **Screenshot**: ![screenshot](screenshots/optimized/Screenshot%202026-06-13%20134845.png)

## Summary of Improvements

| Interaction      | Baseline (ms) | Optimized (ms) | Improvement |
| ---------------- | ------------- | -------------- | ----------- |
| Sort countries   | 578.6         | 25.9           | 95.5%       |
| Search countries | 251.5         | 13.4           | 94.7%       |
| Change year      | 31.9          | 48.9           | -53.3%      |
| Toggle column    | 40.5          | 9.7            | 76.0%       |
| **Average**      | **225.6**     | **24.5**       | **89.1%**   |

