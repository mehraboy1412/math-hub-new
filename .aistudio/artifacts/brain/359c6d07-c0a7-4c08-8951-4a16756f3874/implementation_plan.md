# Subtext Hint Fix: Prevent Answer Leakage in Question Examples

Resolve the issue where subtext examples dynamically interpolated the active question's actual answer, replacing them with generic, static formatting guidance.

## User Review & Critical Decisions

> [!IMPORTANT]
> In Fraction and Arithmetic drill modes, the subtext helper previously rendered the active question's exact answer (e.g., displaying `(e.g. 14 2/7 or 14.28%)` for `1/7 = ? %`). This will be replaced immediately with neutral, static format examples (e.g., `(e.g. 16 2/3 or 16.66)`), preserving the training challenge.

- **Confirmed Decision**: Replace all dynamic answer template strings in `subtext` with static, educational format examples that never match the active problem.

---

## 1. Problem Root Cause

In `src/app.js`:
1. **Fraction to Percentage**:
   - `subtext: Enter mixed fraction (e.g. ${mixedRaw}) or decimal (${item.decimals[0]}%)`
   - Leaked the exact mixed fraction and decimal answer to the user before they typed.
2. **Percentage to Fraction**:
   - `subtext: Enter fraction as numerator/denominator (e.g. ${item.fraction})`
   - Leaked the exact fraction answer (e.g. `3/8` when asking `37.5% = ?`).
3. **2-Digit Addition**:
   - `subtext: Split & Merge: (${Math.floor(a/10)*10} + ${Math.floor(b/10)*10}) + (${a%10} + ${b%10})`
   - Leaked the split values.
4. **2-Digit Subtraction**:
   - `subtext: Split: ${a} - ${Math.floor(b/10)*10} - ${b%10}`
   - Leaked the split values.

---

## 2. Solution & Static Format Guidelines

- **Fraction to Percentage**:
  - `subtext: 'Enter as mixed fraction (e.g. 16 2/3) or decimal (16.66)'`
- **Percentage to Fraction**:
  - `subtext: 'Enter reduced fraction (e.g. 1/4 or 3/8)'`
- **Addition**:
  - `subtext: 'Left-to-right mental split: add tens first, then units'`
- **Subtraction**:
  - `subtext: 'Left-to-right mental split: subtract tens first, then units'`
- **Squares & Cubes**:
  - Keep clean generic labels (`'Calculate square'` / `'Find cube root'`).

---

## 3. Implementation Steps

1. In `src/app.js`, edit `QuestionGenerators.fractions` and `QuestionGenerators.arithmetic` to eliminate all active variable interpolations from `subtext`.
2. Ensure both `src/app.js` and `index.html` maintain these neutral static guidelines.
3. Validate compilation with `compile_applet` and `lint_applet`.
