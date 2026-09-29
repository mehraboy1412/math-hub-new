// Math Practice Hub - SSC CGL Calculation Trainer
// Ultra-fast, competitive-exam grade mental math engine

(function () {
  'use strict';

  // -------------------------------------------------------------
  // AUDIO SYNTHESIZER (Web Audio API - 100% Offline & Pure Synth)
  // -------------------------------------------------------------
  class SoundSynth {
    constructor() {
      this.ctx = null;
      this.enabled = localStorage.getItem('math_sound_enabled') !== 'false';
    }

    init() {
      if (!this.ctx && (window.AudioContext || window.webkitAudioContext)) {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        this.ctx = new AudioContextClass();
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
    }

    toggle() {
      this.enabled = !this.enabled;
      localStorage.setItem('math_sound_enabled', this.enabled ? 'true' : 'false');
      return this.enabled;
    }

    tick() {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;
      try {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, this.ctx.currentTime);
        gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.03);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.03);
      } catch (e) {}
    }

    correct() {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;
      try {
        const now = this.ctx.currentTime;
        // Two-tone bell chime
        [523.25, 659.25, 783.99].forEach((freq, i) => {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, now + i * 0.04);
          gain.gain.setValueAtTime(0.12, now + i * 0.04);
          gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.04 + 0.28);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(now + i * 0.04);
          osc.stop(now + i * 0.04 + 0.3);
        });
      } catch (e) {}
    }

    wrong() {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;
      try {
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(130, now);
        osc.frequency.linearRampToValueAtTime(95, now + 0.2);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.24);
      } catch (e) {}
    }

    streakMilestone() {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;
      try {
        const now = this.ctx.currentTime;
        [523.25, 659.25, 783.99, 1046.5].forEach((freq, i) => {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now + i * 0.06);
          gain.gain.setValueAtTime(0.12, now + i * 0.06);
          gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.06 + 0.25);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(now + i * 0.06);
          osc.stop(now + i * 0.06 + 0.28);
        });
      } catch (e) {}
    }

    vibrate(pattern) {
      if ('vibrate' in navigator) {
        try { navigator.vibrate(pattern); } catch (e) {}
      }
    }
  }

  const sound = new SoundSynth();

  // -------------------------------------------------------------
  // SPACES & CONSTANTS FOR SSC CGL
  // -------------------------------------------------------------
  const SSC_FRACTIONS = [
    { fraction: '1/2', percent: '50%', decimals: ['50', '50.0'], fracStr: '1/2' },
    { fraction: '1/3', percent: '33.33%', decimals: ['33.33', '33.3'], fracStr: '1/3' },
    { fraction: '1/4', percent: '25%', decimals: ['25', '25.0'], fracStr: '1/4' },
    { fraction: '1/5', percent: '20%', decimals: ['20', '20.0'], fracStr: '1/5' },
    { fraction: '1/6', percent: '16.66%', decimals: ['16.66', '16.67'], fracStr: '1/6' },
    { fraction: '1/7', percent: '14.28%', decimals: ['14.28', '14.29'], fracStr: '1/7' },
    { fraction: '1/8', percent: '12.5%', decimals: ['12.5', '12.50'], fracStr: '1/8' },
    { fraction: '1/9', percent: '11.11%', decimals: ['11.11'], fracStr: '1/9' },
    { fraction: '1/10', percent: '10%', decimals: ['10', '10.0'], fracStr: '1/10' },
    { fraction: '1/11', percent: '9.09%', decimals: ['9.09'], fracStr: '1/11' },
    { fraction: '1/12', percent: '8.33%', decimals: ['8.33'], fracStr: '1/12' },
    { fraction: '1/13', percent: '7.69%', decimals: ['7.69'], fracStr: '1/13' },
    { fraction: '1/14', percent: '7.14%', decimals: ['7.14'], fracStr: '1/14' },
    { fraction: '1/15', percent: '6.66%', decimals: ['6.66', '6.67'], fracStr: '1/15' },
    { fraction: '1/16', percent: '6.25%', decimals: ['6.25'], fracStr: '1/16' },
    { fraction: '1/17', percent: '5.88%', decimals: ['5.88'], fracStr: '1/17' },
    { fraction: '1/18', percent: '5.55%', decimals: ['5.55'], fracStr: '1/18' },
    { fraction: '1/19', percent: '5.26%', decimals: ['5.26'], fracStr: '1/19' },
    { fraction: '1/20', percent: '5%', decimals: ['5', '5.0'], fracStr: '1/20' },
    { fraction: '1/21', percent: '4.76%', decimals: ['4.76'], fracStr: '1/21' },
    { fraction: '1/22', percent: '4.54%', decimals: ['4.54'], fracStr: '1/22' },
    { fraction: '1/23', percent: '4.34%', decimals: ['4.34'], fracStr: '1/23' },
    { fraction: '1/24', percent: '4.16%', decimals: ['4.16', '4.17'], fracStr: '1/24' },
    { fraction: '1/25', percent: '4%', decimals: ['4', '4.0'], fracStr: '1/25' },
    // Popular SSC Multi-Fractions
    { fraction: '3/8', percent: '37.5%', decimals: ['37.5', '37.50'], fracStr: '3/8' },
    { fraction: '5/8', percent: '62.5%', decimals: ['62.5', '62.50'], fracStr: '5/8' },
    { fraction: '7/8', percent: '87.5%', decimals: ['87.5', '87.50'], fracStr: '7/8' },
    { fraction: '2/3', percent: '66.66%', decimals: ['66.66', '66.67'], fracStr: '2/3' },
    { fraction: '3/4', percent: '75%', decimals: ['75', '75.0'], fracStr: '3/4' },
    { fraction: '2/7', percent: '28.57%', decimals: ['28.57'], fracStr: '2/7' },
    { fraction: '4/7', percent: '57.14%', decimals: ['57.14'], fracStr: '4/7' },
    { fraction: '5/6', percent: '83.33%', decimals: ['83.33'], fracStr: '5/6' },
    { fraction: '7/12', percent: '58.33%', decimals: ['58.33'], fracStr: '7/12' }
  ];

  const CGL_PRIMES = [17, 19, 23, 29, 31, 37, 41, 43, 47];

  // Helper for digital root (sum of digits reduced to 1-9)
  function getDigitalRoot(n) {
    let num = Math.abs(Math.round(n));
    if (num === 0) return 0;
    return 1 + ((num - 1) % 9);
  }

  // Helper for random integer in range [min, max]
  function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // Helper to shuffle array
  function shuffleArray(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  // -------------------------------------------------------------
  // ERROR BANK & SPACED REPETITION ENGINE
  // -------------------------------------------------------------
  class ErrorBankManager {
    constructor() {
      this.STORAGE_KEY = 'math_weak_spots';
      this.items = this.load();
    }

    load() {
      try {
        const raw = localStorage.getItem(this.STORAGE_KEY);
        return raw ? JSON.parse(raw) : [];
      } catch (e) {
        return [];
      }
    }

    save() {
      try {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.items));
      } catch (e) {}
    }

    recordMistake(q) {
      const existing = this.items.find(item => item.prompt === q.prompt);
      if (existing) {
        existing.consecutiveCorrect = 0;
        existing.attempts = (existing.attempts || 1) + 1;
        existing.lastSeen = Date.now();
      } else {
        this.items.push({
          id: 'err_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
          prompt: q.prompt,
          answer: String(q.answer),
          type: q.type || 'Standard',
          explanation: q.explanation || `Answer: ${q.answer}`,
          category: q.category || 'General',
          consecutiveCorrect: 0,
          attempts: 1,
          createdAt: Date.now()
        });
      }
      this.save();
    }

    recordSuccess(prompt) {
      const idx = this.items.findIndex(item => item.prompt === prompt);
      if (idx !== -1) {
        this.items[idx].consecutiveCorrect = (this.items[idx].consecutiveCorrect || 0) + 1;
        // Graduation rule: 2 consecutive correct answers under time limit
        if (this.items[idx].consecutiveCorrect >= 2) {
          this.items.splice(idx, 1);
        }
        this.save();
      }
    }

    clear() {
      this.items = [];
      this.save();
    }

    getCount() {
      return this.items.length;
    }
  }

  const errorBank = new ErrorBankManager();

  // -------------------------------------------------------------
  // LIFETIME STATS MANAGER
  // -------------------------------------------------------------
  class LifetimeStatsManager {
    constructor() {
      this.STORAGE_KEY = 'math_lifetime_stats';
      this.data = this.load();
    }

    load() {
      try {
        const raw = localStorage.getItem(this.STORAGE_KEY);
        return raw ? JSON.parse(raw) : {
          totalAnswered: 0,
          totalCorrect: 0,
          bestStreak: 0,
          totalTimeMs: 0
        };
      } catch (e) {
        return { totalAnswered: 0, totalCorrect: 0, bestStreak: 0, totalTimeMs: 0 };
      }
    }

    save() {
      try {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.data));
      } catch (e) {}
    }

    record(isCorrect, reactionTimeMs, currentStreak) {
      this.data.totalAnswered += 1;
      if (isCorrect) {
        this.data.totalCorrect += 1;
      }
      if (currentStreak > (this.data.bestStreak || 0)) {
        this.data.bestStreak = currentStreak;
      }
      this.data.totalTimeMs = (this.data.totalTimeMs || 0) + reactionTimeMs;
      this.save();
    }

    reset() {
      this.data = { totalAnswered: 0, totalCorrect: 0, bestStreak: 0, totalTimeMs: 0 };
      this.save();
    }
  }

  const lifetimeStats = new LifetimeStatsManager();

  // -------------------------------------------------------------
  // QUESTION GENERATORS ENGINE
  // -------------------------------------------------------------
  const QuestionGenerators = {
    // 1. Multiplication Tables (1 to 50)
    tables(selectedTables, maxMultiplier) {
      const bases = selectedTables.length > 0 ? selectedTables : [12, 13, 14, 15, 16, 17, 18, 19, 23, 29];
      const base = bases[randInt(0, bases.length - 1)];
      const mult = randInt(2, maxMultiplier || 12);
      const ans = base * mult;
      return {
        category: `Table ${base}`,
        type: 'direct',
        prompt: `${base} × ${mult} = ?`,
        formulaDisplay: `${base} × ${mult}`,
        answer: String(ans),
        acceptedAnswers: [String(ans)],
        subtext: `Multiply ${base} by ${mult}`,
        explanation: `${base} × ${mult} = ${ans}`
      };
    },

    // 2. Squares & Cubes
    powers(options) {
      const pool = [];
      if (options.sq1_25) pool.push('sq1_25');
      if (options.sq26_50) pool.push('sq26_50');
      if (options.cu1_15) pool.push('cu1_15');
      if (options.cu16_30) pool.push('cu16_30');

      const pick = pool.length > 0 ? pool[randInt(0, pool.length - 1)] : 'sq1_25';
      const allowRoots = options.includeRoots && Math.random() < 0.35;

      if (pick === 'sq1_25' || pick === 'sq26_50') {
        const n = pick === 'sq1_25' ? randInt(2, 25) : randInt(26, 50);
        const sq = n * n;
        if (allowRoots) {
          return {
            category: 'Square Root',
            type: 'direct',
            prompt: `√${sq} = ?`,
            formulaDisplay: `√${sq}`,
            answer: String(n),
            acceptedAnswers: [String(n)],
            subtext: `Find square root of ${sq}`,
            explanation: `√${sq} = ${n} (since ${n}² = ${sq})`
          };
        }
        return {
          category: 'Square',
          type: 'direct',
          prompt: `${n}² = ?`,
          formulaDisplay: `${n}²`,
          answer: String(sq),
          acceptedAnswers: [String(sq)],
          subtext: `Square of ${n}`,
          explanation: `${n} × ${n} = ${sq}`
        };
      } else {
        const n = pick === 'cu1_15' ? randInt(2, 15) : randInt(16, 30);
        const cube = n * n * n;
        if (allowRoots) {
          return {
            category: 'Cube Root',
            type: 'direct',
            prompt: `∛${cube} = ?`,
            formulaDisplay: `∛${cube}`,
            answer: String(n),
            acceptedAnswers: [String(n)],
            subtext: `Find cube root of ${cube}`,
            explanation: `∛${cube} = ${n} (since ${n}³ = ${cube})`
          };
        }
        return {
          category: 'Cube',
          type: 'direct',
          prompt: `${n}³ = ?`,
          formulaDisplay: `${n}³`,
          answer: String(cube),
          acceptedAnswers: [String(cube)],
          subtext: `Cube of ${n}`,
          explanation: `${n}³ = ${cube}`
        };
      }
    },

    // 3. Fractions to % & Decimals
    fractions(options) {
      let subset = SSC_FRACTIONS;
      if (!options.common) {
        subset = subset.filter(f => f.fracStr.startsWith('1/'));
      }
      const item = subset[randInt(0, subset.length - 1)];
      const askPercentToFrac = options.bidirectional && Math.random() < 0.5;

      if (askPercentToFrac) {
        // e.g. "37.5% = ?" -> Ans "3/8"
        return {
          category: 'Percentage to Fraction',
          type: 'direct',
          prompt: `${item.percent} = ?`,
          formulaDisplay: `${item.percent} = ?`,
          answer: item.fracStr,
          acceptedAnswers: [item.fracStr, item.fracStr.replace('/', ' / ')],
          subtext: 'Enter fraction as numerator/denominator (e.g. 3/8)',
          hasFractionKeys: true,
          explanation: `${item.percent} = ${item.fracStr}`
        };
      } else {
        // e.g. "1/7 = ?" -> Ans "14.28" or "14.28%"
        const primaryAns = item.decimals[0];
        const accepted = [...item.decimals, item.percent, item.percent.replace('%', '')];
        return {
          category: 'Fraction to Percentage',
          type: 'direct',
          prompt: `${item.fracStr} = ? %`,
          formulaDisplay: `${item.fracStr}`,
          answer: primaryAns,
          acceptedAnswers: accepted,
          subtext: `Percentage value (e.g. ${primaryAns} or ${item.percent})`,
          hasFractionKeys: true,
          explanation: `${item.fracStr} = ${item.percent} (${primaryAns}%)`
        };
      }
    },

    // 4. Arithmetic Sprints
    arithmetic(options) {
      const ops = [];
      if (options.add2) ops.push('add2');
      if (options.add3) ops.push('add3');
      if (options.sub2) ops.push('sub2');
      if (options.mult2x2) ops.push('mult2x2');
      if (options.pctShortcut) ops.push('pctShortcut');

      const op = ops.length > 0 ? ops[randInt(0, ops.length - 1)] : 'add2';

      if (op === 'add2') {
        const a = randInt(18, 98);
        const b = randInt(18, 98);
        const ans = a + b;
        return {
          category: 'Addition 2-Digit',
          type: 'direct',
          prompt: `${a} + ${b} = ?`,
          formulaDisplay: `${a} + ${b}`,
          answer: String(ans),
          acceptedAnswers: [String(ans)],
          subtext: `Mental Split & Merge: (${Math.floor(a/10)*10} + ${Math.floor(b/10)*10}) + (${a%10} + ${b%10})`,
          explanation: `${a} + ${b} = ${ans}`
        };
      } else if (op === 'add3') {
        const a = randInt(150, 890);
        const b = randInt(120, 890);
        const ans = a + b;
        return {
          category: 'Addition 3-Digit (Split & Merge)',
          type: 'direct',
          prompt: `${a} + ${b} = ?`,
          formulaDisplay: `${a} + ${b}`,
          answer: String(ans),
          acceptedAnswers: [String(ans)],
          subtext: 'Add hundreds first, then tens, then units',
          explanation: `${a} + ${b} = ${ans}`
        };
      } else if (op === 'sub2') {
        let a = randInt(35, 99);
        let b = randInt(15, a - 5);
        const ans = a - b;
        return {
          category: 'Subtraction 2-Digit',
          type: 'direct',
          prompt: `${a} - ${b} = ?`,
          formulaDisplay: `${a} - ${b}`,
          answer: String(ans),
          acceptedAnswers: [String(ans)],
          subtext: `Split: ${a} - ${Math.floor(b/10)*10} - ${b%10}`,
          explanation: `${a} - ${b} = ${ans}`
        };
      } else if (op === 'mult2x2') {
        const a = randInt(12, 45);
        const b = randInt(12, 35);
        const ans = a * b;
        return {
          category: '2×2 Cross-Multiplication',
          type: 'direct',
          prompt: `${a} × ${b} = ?`,
          formulaDisplay: `${a} × ${b}`,
          answer: String(ans),
          acceptedAnswers: [String(ans)],
          subtext: `U×U, cross (T×U + U×T), T×T`,
          explanation: `${a} × ${b} = ${ans}`
        };
      } else {
        // Percentage shortcuts (e.g. 16% of 450, 35% of 240, 12.5% of 640)
        const presets = [
          { p: 16, base: 450, ans: 72, tip: '16% = 10% (45) + 5% (22.5) + 1% (4.5) = 72' },
          { p: 35, base: 240, ans: 84, tip: '35% = 30% (72) + 5% (12) = 84' },
          { p: 45, base: 180, ans: 81, tip: '45% = 50% (90) - 5% (9) = 81' },
          { p: 12.5, base: 640, ans: 80, tip: '12.5% = 1/8 of 640 = 80' },
          { p: 25, base: 360, ans: 90, tip: '25% = 1/4 of 360 = 90' },
          { p: 37.5, base: 480, ans: 180, tip: '37.5% = 3/8 of 480 = 180' },
          { p: 14.28, base: 490, ans: 70, tip: '14.28% = 1/7 of 490 = 70' },
          { p: 75, base: 520, ans: 390, tip: '75% = 3/4 of 520 = 390' },
          { p: 20, base: 650, ans: 130, tip: '20% = 1/5 of 650 = 130' }
        ];
        const item = presets[randInt(0, presets.length - 1)];
        return {
          category: 'Percentage Shortcut',
          type: 'direct',
          prompt: `${item.p}% of ${item.base} = ?`,
          formulaDisplay: `${item.p}% of ${item.base}`,
          answer: String(item.ans),
          acceptedAnswers: [String(item.ans)],
          subtext: 'Use fraction conversions or 10%/5% breakdown',
          explanation: item.tip
        };
      }
    },

    // 5. Option Elimination Drill (SSC CGL Mode)
    elimination(options) {
      const techniques = [];
      if (options.unit) techniques.push('unit');
      if (options.tens) techniques.push('tens');
      if (options.root) techniques.push('root');
      if (options.approx) techniques.push('approx');

      const tech = techniques.length > 0 ? techniques[randInt(0, techniques.length - 1)] : 'unit';

      if (tech === 'unit') {
        // Unit digit elimination: (a * b) + (c * d)
        // Ensure distinct unit digits across options
        const a = randInt(123, 789);
        const b = randInt(12, 98);
        const c = randInt(111, 456);
        const d = randInt(11, 55);
        const correctVal = (a * b) + (c * d);
        const correctUnit = Math.abs(correctVal % 10);

        // Generate 3 wrong options that differ in the unit digit!
        const distractors = new Set();
        const otherUnits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].filter(u => u !== correctUnit);
        shuffleArray(otherUnits);

        for (let i = 0; i < 3; i++) {
          const fakeOffset = randInt(-4, 4) * 10;
          const fakeVal = correctVal + fakeOffset - (correctVal % 10) + otherUnits[i];
          distractors.add(fakeVal === correctVal ? fakeVal + 1 : fakeVal);
        }

        const choices = shuffleArray([correctVal, ...Array.from(distractors).slice(0, 3)]);
        const correctIdx = choices.indexOf(correctVal);

        return {
          category: 'Option Elimination · Unit Digit',
          type: 'mcq',
          prompt: `(${a} × ${b}) + (${c} × ${d}) = ?`,
          formulaDisplay: `(${a} × ${b}) + (${c} × ${d})`,
          options: choices.map(String),
          correctIndex: correctIdx,
          answer: String(correctVal),
          subtext: 'Eliminate by Unit Digit alone!',
          explanation: `Unit digit: (${a%10} × ${b%10}) + (${c%10} × ${d%10}) = ${(a%10)*(b%10)} + ${(c%10)*(d%10)} ➔ ends in ${correctUnit}. Only Option ${String.fromCharCode(65 + correctIdx)} matches!`
        };
      } else if (tech === 'root') {
        // Digital Root (Casting out nines)
        const a = randInt(34, 88);
        const b = randInt(25, 76);
        const correctVal = a * b;
        const correctRoot = getDigitalRoot(correctVal);

        const distractors = new Set();
        let delta = 2;
        while (distractors.size < 3) {
          const fakeVal = correctVal + delta;
          if (getDigitalRoot(fakeVal) !== correctRoot) {
            distractors.add(fakeVal);
          }
          delta += randInt(1, 3);
        }

        const choices = shuffleArray([correctVal, ...Array.from(distractors)]);
        const correctIdx = choices.indexOf(correctVal);

        return {
          category: 'Option Elimination · Digital Root',
          type: 'mcq',
          prompt: `${a} × ${b} = ?`,
          formulaDisplay: `${a} × ${b}`,
          options: choices.map(String),
          correctIndex: correctIdx,
          answer: String(correctVal),
          subtext: 'Find digit sum (Digital Root) of product',
          explanation: `Digital Root: ${getDigitalRoot(a)} × ${getDigitalRoot(b)} = ${getDigitalRoot(a) * getDigitalRoot(b)} ➔ Root ${correctRoot}. Option ${String.fromCharCode(65 + correctIdx)} is the only match!`
        };
      } else if (tech === 'tens') {
        // Tens digit verification
        const a = randInt(35, 95);
        const b = randInt(15, 65);
        const correctVal = a * b;
        const lastTwo = correctVal % 100;

        const distractors = new Set();
        [-30, -20, 20, 40].forEach(diff => {
          if (distractors.size < 3) distractors.add(correctVal + diff);
        });

        const choices = shuffleArray([correctVal, ...Array.from(distractors)]);
        const correctIdx = choices.indexOf(correctVal);

        return {
          category: 'Option Elimination · Tens Digit',
          type: 'mcq',
          prompt: `${a} × ${b} = ?`,
          formulaDisplay: `${a} × ${b}`,
          options: choices.map(String),
          correctIndex: correctIdx,
          answer: String(correctVal),
          subtext: 'Inspect the last 2 digits',
          explanation: `Last 2 digits of ${a} × ${b} are ${lastTwo < 10 ? '0' + lastTwo : lastTwo}. Option ${String.fromCharCode(65 + correctIdx)} matches!`
        };
      } else {
        // Approximation / Magnitude elimination
        const a = randInt(189, 495);
        const b = randInt(21, 62);
        const correctVal = a * b;

        const approxA = Math.round(a / 50) * 50;
        const approxB = Math.round(b / 10) * 10;
        const rough = approxA * approxB;

        const distractors = [
          Math.round(correctVal * 1.5),
          Math.round(correctVal * 0.65),
          Math.round(correctVal * 2.2)
        ];

        const choices = shuffleArray([correctVal, ...distractors]);
        const correctIdx = choices.indexOf(correctVal);

        return {
          category: 'Option Elimination · Approximation',
          type: 'mcq',
          prompt: `${a} × ${b} = ?`,
          formulaDisplay: `${a} × ${b}`,
          options: choices.map(String),
          correctIndex: correctIdx,
          answer: String(correctVal),
          subtext: `Quick approx: ~${approxA} × ~${approxB} = ~${rough}`,
          explanation: `Approximate: ${a} × ${b} ≈ ${approxA} × ${approxB} = ${rough}. Option ${String.fromCharCode(65 + correctIdx)} (${correctVal}) is closest!`
        };
      }
    }
  };

  // -------------------------------------------------------------
  // APP STATE CONTROLLER
  // -------------------------------------------------------------
  class MathHubApp {
    constructor() {
      // Configuration
      this.mode = 'blitz'; // blitz, marathon, classic, error_drill
      this.blitzDuration = 3;
      this.marathonDuration = 120;
      this.classicTarget = 25;
      this.currentModule = 'tables';
      this.selectedTables = [12, 13, 14, 15, 16, 17, 18, 19, 23, 29];
      this.maxMultiplier = 12;
      this.autoSubmit = true;
      this.useNativeKeypad = false;

      // Session runtime state
      this.sessionActive = false;
      this.sessionPaused = false;
      this.currentQuestion = null;
      this.questionStartTime = 0;
      this.sessionStartTime = 0;
      this.streak = 0;
      this.bestStreakInSession = 0;
      this.score = 0;
      this.totalQuestionsAnswered = 0;
      this.totalResponseTimeMs = 0;
      this.isProcessingAnswer = false;
      this.sessionMistakes = [];
      this.errorDrillPool = [];

      // Timer IDs
      this.animFrameId = null;
      this.marathonInterval = null;

      this.cacheDom();
      this.bindEvents();
      this.renderTableNumbersGrid();
      this.updateErrorBadges();
      this.updateSoundIcon();
      this.updateConfigSummary();
    }

    cacheDom() {
      // Views & Modals
      this.dom = {
        viewSetup: document.getElementById('viewSetup'),
        viewDrill: document.getElementById('viewDrill'),
        modalPause: document.getElementById('modalPause'),
        modalSummary: document.getElementById('modalSummary'),
        modalErrorBank: document.getElementById('modalErrorBank'),
        modalStats: document.getElementById('modalStats'),

        // Header controls
        btnNavHome: document.getElementById('btnNavHome'),
        btnOpenErrorBank: document.getElementById('btnOpenErrorBank'),
        btnOpenStats: document.getElementById('btnOpenStats'),
        btnToggleSound: document.getElementById('btnToggleSound'),
        iconSoundOn: document.getElementById('iconSoundOn'),
        iconSoundOff: document.getElementById('iconSoundOff'),
        headerErrorBadge: document.getElementById('headerErrorBadge'),
        setupErrorCount: document.getElementById('setupErrorCount'),

        // Setup controls
        btnStartTraining: document.getElementById('btnStartTraining'),
        btnDrillErrorsSetup: document.getElementById('btnDrillErrorsSetup'),
        chkAutoSubmit: document.getElementById('chkAutoSubmit'),
        btnKeypadVirtual: document.getElementById('btnKeypadVirtual'),
        btnKeypadNative: document.getElementById('btnKeypadNative'),
        summaryConfigText: document.getElementById('summaryConfigText'),

        // Module config panels
        cfgTables: document.getElementById('cfgTables'),
        cfgPowers: document.getElementById('cfgPowers'),
        cfgFractions: document.getElementById('cfgFractions'),
        cfgArithmetic: document.getElementById('cfgArithmetic'),
        cfgElimination: document.getElementById('cfgElimination'),
        tableNumbersGrid: document.getElementById('tableNumbersGrid'),
        selectedTablesCount: document.getElementById('selectedTablesCount'),

        // Session status
        drillStreak: document.getElementById('drillStreak'),
        timerBar: document.getElementById('timerBar'),
        timerText: document.getElementById('timerText'),
        timerContainer: document.getElementById('timerContainer'),
        drillScore: document.getElementById('drillScore'),
        drillTotalCount: document.getElementById('drillTotalCount'),
        btnPauseSession: document.getElementById('btnPauseSession'),
        btnResumeSession: document.getElementById('btnResumeSession'),
        btnExitSession: document.getElementById('btnExitSession'),

        // Question display
        questionStage: document.getElementById('questionStage'),
        drillCategoryBadge: document.getElementById('drillCategoryBadge'),
        drillQuestionText: document.getElementById('drillQuestionText'),
        drillQuestionSubtext: document.getElementById('drillQuestionSubtext'),
        drillFeedbackBanner: document.getElementById('drillFeedbackBanner'),
        feedbackText: document.getElementById('feedbackText'),
        feedbackAnswer: document.getElementById('feedbackAnswer'),

        // Inputs
        containerDirectInput: document.getElementById('containerDirectInput'),
        containerMcqOptions: document.getElementById('containerMcqOptions'),
        inputBoxWrapper: document.getElementById('inputBoxWrapper'),
        mathInput: document.getElementById('mathInput'),
        autoSubmitBadge: document.getElementById('autoSubmitBadge'),
        fractionHelperRow: document.getElementById('fractionHelperRow'),
        virtualKeypad: document.getElementById('virtualKeypad'),
        btnKeypadClear: document.getElementById('btnKeypadClear'),
        btnKeypadSubmit: document.getElementById('btnKeypadSubmit'),

        // MCQ
        cglShortcutBanner: document.getElementById('cglShortcutBanner'),
        cglShortcutText: document.getElementById('cglShortcutText'),

        // Summary elements
        summaryModeLabel: document.getElementById('summaryModeLabel'),
        sumAccuracy: document.getElementById('sumAccuracy'),
        sumScore: document.getElementById('sumScore'),
        sumAvgSpeed: document.getElementById('sumAvgSpeed'),
        sumBestStreak: document.getElementById('sumBestStreak'),
        sumErrorsLogged: document.getElementById('sumErrorsLogged'),
        sumErrorBadge: document.getElementById('sumErrorBadge'),
        btnRetrySession: document.getElementById('btnRetrySession'),
        btnDrillErrorsFromSummary: document.getElementById('btnDrillErrorsFromSummary'),
        btnCloseSummary: document.getElementById('btnCloseSummary'),

        // Error bank modal
        errorBankList: document.getElementById('errorBankList'),
        btnCloseErrorBank: document.getElementById('btnCloseErrorBank'),
        btnClearErrors: document.getElementById('btnClearErrors'),
        btnStartDrillFromModal: document.getElementById('btnStartDrillFromModal'),

        // Lifetime stats modal
        statTotalAnswered: document.getElementById('statTotalAnswered'),
        statLifetimeAccuracy: document.getElementById('statLifetimeAccuracy'),
        statBestStreak: document.getElementById('statBestStreak'),
        statAvgReaction: document.getElementById('statAvgReaction'),
        btnCloseStats: document.getElementById('btnCloseStats'),
        btnDoneStats: document.getElementById('btnDoneStats'),
        btnResetStats: document.getElementById('btnResetStats')
      };
    }

    bindEvents() {
      const d = this.dom;

      // Nav and Header
      d.btnNavHome.addEventListener('click', () => {
        if (this.sessionActive) {
          if (confirm('Leave current practice drill?')) this.exitSessionToSetup();
        } else {
          this.showView('setup');
        }
      });

      d.btnToggleSound.addEventListener('click', () => {
        sound.toggle();
        this.updateSoundIcon();
      });

      d.btnOpenErrorBank.addEventListener('click', () => this.openErrorBankModal());
      d.btnCloseErrorBank.addEventListener('click', () => d.modalErrorBank.classList.add('hidden'));
      d.btnClearErrors.addEventListener('click', () => {
        if (confirm('Clear all items from your error bank?')) {
          errorBank.clear();
          this.renderErrorBankItems();
          this.updateErrorBadges();
        }
      });
      d.btnStartDrillFromModal.addEventListener('click', () => {
        d.modalErrorBank.classList.add('hidden');
        this.startErrorDrillSession();
      });
      d.btnDrillErrorsSetup.addEventListener('click', () => this.startErrorDrillSession());

      d.btnOpenStats.addEventListener('click', () => this.openStatsModal());
      d.btnCloseStats.addEventListener('click', () => d.modalStats.classList.add('hidden'));
      d.btnDoneStats.addEventListener('click', () => d.modalStats.classList.add('hidden'));
      d.btnResetStats.addEventListener('click', () => {
        if (confirm('Reset all lifetime accuracy and speed statistics?')) {
          lifetimeStats.reset();
          this.renderStatsModal();
        }
      });

      // Mode Selection
      document.querySelectorAll('.mode-card').forEach(card => {
        card.addEventListener('click', () => {
          document.querySelectorAll('.mode-card').forEach(c => {
            c.classList.remove('border-indigo-500', 'bg-indigo-950/20');
            c.classList.add('border-zinc-800', 'bg-zinc-900/60');
          });
          card.classList.remove('border-zinc-800', 'bg-zinc-900/60');
          card.classList.add('border-indigo-500', 'bg-indigo-950/20');
          this.mode = card.dataset.mode;
          this.updateConfigSummary();
          sound.tick();
        });
      });

      // Blitz Time buttons
      document.querySelectorAll('.blitz-time-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          document.querySelectorAll('.blitz-time-btn').forEach(b => {
            b.className = 'blitz-time-btn px-2 py-1 rounded-md text-[11px] font-bold bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-700';
          });
          btn.className = 'blitz-time-btn px-2 py-1 rounded-md text-[11px] font-bold bg-indigo-600 text-white border border-indigo-400';
          this.blitzDuration = parseInt(btn.dataset.blitzTime, 10);
          this.mode = 'blitz';
          this.selectModeCard('blitz');
          this.updateConfigSummary();
          sound.tick();
        });
      });

      // Marathon Time buttons
      document.querySelectorAll('.marathon-time-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          document.querySelectorAll('.marathon-time-btn').forEach(b => {
            b.className = 'marathon-time-btn px-2.5 py-1 rounded-md text-[11px] font-bold bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-700';
          });
          btn.className = 'marathon-time-btn px-2.5 py-1 rounded-md text-[11px] font-bold bg-indigo-600 text-white border border-indigo-400';
          this.marathonDuration = parseInt(btn.dataset.marathonTime, 10);
          this.mode = 'marathon';
          this.selectModeCard('marathon');
          this.updateConfigSummary();
          sound.tick();
        });
      });

      // Classic Count buttons
      document.querySelectorAll('.classic-count-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          document.querySelectorAll('.classic-count-btn').forEach(b => {
            b.className = 'classic-count-btn px-2.5 py-1 rounded-md text-[11px] font-bold bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-700';
          });
          btn.className = 'classic-count-btn px-2.5 py-1 rounded-md text-[11px] font-bold bg-indigo-600 text-white border border-indigo-400';
          this.classicTarget = parseInt(btn.dataset.classicCount, 10);
          this.mode = 'classic';
          this.selectModeCard('classic');
          this.updateConfigSummary();
          sound.tick();
        });
      });

      // Module Selection
      document.querySelectorAll('.module-tab').forEach(tab => {
        tab.addEventListener('click', () => {
          document.querySelectorAll('.module-tab').forEach(t => {
            t.classList.remove('border-indigo-500', 'bg-indigo-950/20');
            t.classList.add('border-zinc-800', 'bg-zinc-900/60');
          });
          tab.classList.remove('border-zinc-800', 'bg-zinc-900/60');
          tab.classList.add('border-indigo-500', 'bg-indigo-950/20');
          this.currentModule = tab.dataset.module;
          this.showModuleConfig(this.currentModule);
          this.updateConfigSummary();
          sound.tick();
        });
      });

      // Multiplier depth
      document.querySelectorAll('.depth-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          document.querySelectorAll('.depth-btn').forEach(b => {
            b.className = 'depth-btn px-2 py-0.5 rounded text-xs font-bold text-zinc-400 hover:text-white';
          });
          btn.className = 'depth-btn px-2 py-0.5 rounded text-xs font-bold bg-indigo-600 text-white';
          this.maxMultiplier = parseInt(btn.dataset.multDepth, 10);
          this.updateConfigSummary();
          sound.tick();
        });
      });

      // Quick Chips for Tables
      document.querySelectorAll('.table-chip').forEach(chip => {
        chip.addEventListener('click', () => {
          const type = chip.dataset.chip;
          if (type === '1-20') this.selectedTables = Array.from({ length: 20 }, (_, i) => i + 1);
          else if (type === '21-30') this.selectedTables = Array.from({ length: 10 }, (_, i) => i + 21);
          else if (type === '31-40') this.selectedTables = Array.from({ length: 10 }, (_, i) => i + 31);
          else if (type === '41-50') this.selectedTables = Array.from({ length: 10 }, (_, i) => i + 41);
          else if (type === 'primes') this.selectedTables = [...CGL_PRIMES];
          else if (type === 'all') this.selectedTables = Array.from({ length: 50 }, (_, i) => i + 1);
          else if (type === 'clear') this.selectedTables = [];
          
          this.syncTableGridSelection();
          this.updateConfigSummary();
          sound.tick();
        });
      });

      // UX Preferences
      d.chkAutoSubmit.addEventListener('change', (e) => {
        this.autoSubmit = e.target.checked;
        d.autoSubmitBadge.classList.toggle('hidden', !this.autoSubmit);
      });

      d.btnKeypadVirtual.addEventListener('click', () => {
        this.useNativeKeypad = false;
        d.btnKeypadVirtual.className = 'px-2 py-0.5 rounded text-xs font-bold bg-indigo-600 text-white';
        d.btnKeypadNative.className = 'px-2 py-0.5 rounded text-xs font-bold text-zinc-400 hover:text-white';
        d.virtualKeypad.classList.remove('hidden');
        sound.tick();
      });

      d.btnKeypadNative.addEventListener('click', () => {
        this.useNativeKeypad = true;
        d.btnKeypadNative.className = 'px-2 py-0.5 rounded text-xs font-bold bg-indigo-600 text-white';
        d.btnKeypadVirtual.className = 'px-2 py-0.5 rounded text-xs font-bold text-zinc-400 hover:text-white';
        d.virtualKeypad.classList.add('hidden');
        d.mathInput.focus();
        sound.tick();
      });

      // Launch session
      d.btnStartTraining.addEventListener('click', () => this.startSession());

      // Physical Keyboard Handlers
      window.addEventListener('keydown', (e) => this.handleGlobalKeyDown(e));

      // Virtual Keypad clicks
      document.querySelectorAll('.numpad-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          this.handleKeypadInput(btn.dataset.key);
        });
      });

      d.btnKeypadClear.addEventListener('click', (e) => {
        e.preventDefault();
        this.handleKeypadBackspace();
      });

      d.btnKeypadSubmit.addEventListener('click', (e) => {
        e.preventDefault();
        this.submitDirectAnswer();
      });

      // Aux keys for fraction mode (/ and .)
      document.querySelectorAll('.aux-key').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          this.handleKeypadInput(btn.dataset.val);
        });
      });

      // MCQ Choice click handlers
      document.querySelectorAll('.mcq-option-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          const idx = parseInt(btn.dataset.optionIdx, 10);
          this.handleMcqSelect(idx);
        });
      });

      // Direct Input typing & auto-submit check
      d.mathInput.addEventListener('input', () => {
        sound.tick();
        if (this.autoSubmit && this.currentQuestion && this.currentQuestion.type === 'direct') {
          this.checkAutoSubmit();
        }
      });

      // Pause & Resume
      d.btnPauseSession.addEventListener('click', () => this.pauseSession());
      d.btnResumeSession.addEventListener('click', () => this.resumeSession());
      d.btnExitSession.addEventListener('click', () => this.exitSessionToSetup());

      // Summary Modal
      d.btnRetrySession.addEventListener('click', () => {
        d.modalSummary.classList.add('hidden');
        this.startSession();
      });
      d.btnDrillErrorsFromSummary.addEventListener('click', () => {
        d.modalSummary.classList.add('hidden');
        this.startErrorDrillSession();
      });
      d.btnCloseSummary.addEventListener('click', () => {
        d.modalSummary.classList.add('hidden');
        this.showView('setup');
      });
    }

    selectModeCard(mode) {
      document.querySelectorAll('.mode-card').forEach(c => {
        if (c.dataset.mode === mode) {
          c.classList.remove('border-zinc-800', 'bg-zinc-900/60');
          c.classList.add('border-indigo-500', 'bg-indigo-950/20');
        } else {
          c.classList.remove('border-indigo-500', 'bg-indigo-950/20');
          c.classList.add('border-zinc-800', 'bg-zinc-900/60');
        }
      });
    }

    showModuleConfig(moduleName) {
      const d = this.dom;
      d.cfgTables.classList.add('hidden');
      d.cfgPowers.classList.add('hidden');
      d.cfgFractions.classList.add('hidden');
      d.cfgArithmetic.classList.add('hidden');
      d.cfgElimination.classList.add('hidden');

      if (moduleName === 'tables') d.cfgTables.classList.remove('hidden');
      else if (moduleName === 'powers') d.cfgPowers.classList.remove('hidden');
      else if (moduleName === 'fractions') d.cfgFractions.classList.remove('hidden');
      else if (moduleName === 'arithmetic') d.cfgArithmetic.classList.remove('hidden');
      else if (moduleName === 'elimination') d.cfgElimination.classList.remove('hidden');
    }

    renderTableNumbersGrid() {
      const grid = this.dom.tableNumbersGrid;
      grid.innerHTML = '';
      for (let i = 1; i <= 50; i++) {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = `table-num-btn h-6 text-xs font-mono font-bold rounded flex items-center justify-center transition-colors ${
          this.selectedTables.includes(i) ? 'bg-indigo-600 text-white' : 'bg-zinc-800/80 text-zinc-400 hover:text-white'
        }`;
        btn.textContent = i;
        btn.addEventListener('click', () => {
          if (this.selectedTables.includes(i)) {
            this.selectedTables = this.selectedTables.filter(x => x !== i);
          } else {
            this.selectedTables.push(i);
            this.selectedTables.sort((a, b) => a - b);
          }
          this.syncTableGridSelection();
          this.updateConfigSummary();
          sound.tick();
        });
        grid.appendChild(btn);
      }
      this.dom.selectedTablesCount.textContent = this.selectedTables.length;
    }

    syncTableGridSelection() {
      const btns = this.dom.tableNumbersGrid.querySelectorAll('.table-num-btn');
      btns.forEach(btn => {
        const val = parseInt(btn.textContent, 10);
        if (this.selectedTables.includes(val)) {
          btn.className = 'table-num-btn h-6 text-xs font-mono font-bold rounded flex items-center justify-center transition-colors bg-indigo-600 text-white';
        } else {
          btn.className = 'table-num-btn h-6 text-xs font-mono font-bold rounded flex items-center justify-center transition-colors bg-zinc-800/80 text-zinc-400 hover:text-white';
        }
      });
      this.dom.selectedTablesCount.textContent = this.selectedTables.length;
    }

    updateConfigSummary() {
      let modeText = 'Blitz (3s)';
      if (this.mode === 'blitz') modeText = `Blitz (${this.blitzDuration}s)`;
      else if (this.mode === 'marathon') modeText = `Marathon (${this.marathonDuration}s)`;
      else if (this.mode === 'classic') modeText = `Classic (${this.classicTarget} Qs)`;
      else if (this.mode === 'error_drill') modeText = `Error Drill (Graduation 2×)`;

      let modText = 'Tables';
      if (this.currentModule === 'tables') modText = `Tables (${this.selectedTables.length} numbers, ≤x${this.maxMultiplier})`;
      else if (this.currentModule === 'powers') modText = 'Squares & Cubes';
      else if (this.currentModule === 'fractions') modText = 'Fractions ↔ %';
      else if (this.currentModule === 'arithmetic') modText = 'Mental Arithmetic';
      else if (this.currentModule === 'elimination') modText = 'Option Elimination (MCQ)';

      this.dom.summaryConfigText.textContent = `${modeText} · ${modText}`;
    }

    updateErrorBadges() {
      const count = errorBank.getCount();
      this.dom.headerErrorBadge.textContent = count;
      this.dom.setupErrorCount.textContent = count;
      if (this.dom.sumErrorBadge) this.dom.sumErrorBadge.textContent = count;
    }

    updateSoundIcon() {
      if (sound.enabled) {
        this.dom.iconSoundOn.classList.remove('hidden');
        this.dom.iconSoundOff.classList.add('hidden');
      } else {
        this.dom.iconSoundOn.classList.add('hidden');
        this.dom.iconSoundOff.classList.remove('hidden');
      }
    }

    showView(viewName) {
      if (viewName === 'setup') {
        this.dom.viewSetup.classList.remove('hidden');
        this.dom.viewDrill.classList.add('hidden');
        this.dom.modalPause.classList.add('hidden');
        this.sessionActive = false;
      } else if (viewName === 'drill') {
        this.dom.viewSetup.classList.add('hidden');
        this.dom.viewDrill.classList.remove('hidden');
        this.dom.modalPause.classList.add('hidden');
        this.sessionActive = true;
      }
    }

    // -----------------------------------------------------------
    // SESSION LIFECYCLE
    // -----------------------------------------------------------
    startSession() {
      this.sessionActive = true;
      this.sessionPaused = false;
      this.score = 0;
      this.totalQuestionsAnswered = 0;
      this.totalResponseTimeMs = 0;
      this.streak = 0;
      this.bestStreakInSession = 0;
      this.sessionMistakes = [];
      this.sessionStartTime = Date.now();

      this.dom.drillStreak.textContent = '0';
      this.dom.drillScore.textContent = '0';
      this.dom.drillTotalCount.textContent = this.mode === 'classic' ? this.classicTarget : '∞';

      // Switch to Drill View
      this.showView('drill');

      // Keypad preference check
      if (this.useNativeKeypad) {
        this.dom.virtualKeypad.classList.add('hidden');
      } else {
        this.dom.virtualKeypad.classList.remove('hidden');
      }

      // Marathon timer handling
      if (this.marathonInterval) clearInterval(this.marathonInterval);
      if (this.mode === 'marathon') {
        let remaining = this.marathonDuration;
        this.dom.timerText.textContent = `${remaining}s`;
        this.marathonInterval = setInterval(() => {
          if (!this.sessionPaused && this.sessionActive) {
            remaining -= 1;
            this.dom.timerText.textContent = `${remaining}s`;
            const pct = (remaining / this.marathonDuration) * 100;
            this.dom.timerBar.style.width = `${pct}%`;
            if (pct < 20) {
              this.dom.timerBar.className = 'h-full bg-rose-500 rounded-full transition-all duration-100 origin-left';
            } else if (pct < 40) {
              this.dom.timerBar.className = 'h-full bg-amber-400 rounded-full transition-all duration-100 origin-left';
            } else {
              this.dom.timerBar.className = 'h-full bg-indigo-500 rounded-full transition-all duration-100 origin-left';
            }

            if (remaining <= 0) {
              clearInterval(this.marathonInterval);
              this.endSession();
            }
          }
        }, 1000);
      }

      this.nextQuestion();
    }

    startErrorDrillSession() {
      const items = errorBank.load();
      if (items.length === 0) {
        alert('No logged mistakes in Error Bank! All weak spots conquered.');
        return;
      }
      this.mode = 'error_drill';
      this.errorDrillPool = shuffleArray([...items]);
      this.startSession();
    }

    nextQuestion() {
      if (!this.sessionActive) return;

      // Cancel previous animation frame
      if (this.animFrameId) cancelAnimationFrame(this.animFrameId);

      // Check Classic mode completion
      if (this.mode === 'classic' && this.totalQuestionsAnswered >= this.classicTarget) {
        this.endSession();
        return;
      }

      this.isProcessingAnswer = false;
      this.currentQuestion = this.generateNextQuestion();
      this.questionStartTime = Date.now();

      // Render Question Prompt
      this.dom.drillCategoryBadge.textContent = this.currentQuestion.category;
      this.dom.drillQuestionText.textContent = this.currentQuestion.prompt;
      this.dom.drillQuestionSubtext.textContent = this.currentQuestion.subtext || '';

      // Reset feedback banner & input
      this.dom.drillFeedbackBanner.style.opacity = '0';
      this.dom.inputBoxWrapper.className = 'relative flex items-center justify-center w-full h-14 sm:h-16 rounded-2xl bg-zinc-900 border-2 border-zinc-700 transition-colors shadow-inner';
      this.dom.mathInput.value = '';

      // Direct Input vs MCQ
      if (this.currentQuestion.type === 'mcq') {
        this.dom.containerDirectInput.classList.add('hidden');
        this.dom.containerMcqOptions.classList.remove('hidden');
        this.dom.cglShortcutBanner.classList.add('hidden'); // hidden until answered

        // Set choices
        for (let i = 0; i < 4; i++) {
          const optEl = document.getElementById(`optText${i}`);
          if (optEl && this.currentQuestion.options[i] !== undefined) {
            optEl.textContent = this.currentQuestion.options[i];
          }
          const btn = document.querySelector(`[data-option-idx="${i}"]`);
          if (btn) {
            btn.className = 'mcq-option-btn p-3.5 rounded-xl bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 active:scale-98 text-left transition-all flex items-center justify-between group';
          }
        }
      } else {
        this.dom.containerDirectInput.classList.remove('hidden');
        this.dom.containerMcqOptions.classList.add('hidden');

        // Show/hide fraction aux keys
        if (this.currentQuestion.hasFractionKeys) {
          this.dom.fractionHelperRow.classList.remove('hidden');
        } else {
          this.dom.fractionHelperRow.classList.add('hidden');
        }

        // Focus input
        this.dom.mathInput.focus();
      }

      // Start Blitz per-question countdown
      if (this.mode === 'blitz' || this.mode === 'error_drill') {
        const durationSec = this.mode === 'blitz' ? this.blitzDuration : 4;
        const totalDurationMs = durationSec * 1000;
        const startTime = performance.now();

        const updateTimer = (now) => {
          if (!this.sessionActive || this.isProcessingAnswer) return;
          if (this.sessionPaused) {
            this.animFrameId = requestAnimationFrame(updateTimer);
            return;
          }

          const elapsed = now - startTime;
          const remainingMs = Math.max(0, totalDurationMs - elapsed);
          const ratio = remainingMs / totalDurationMs;

          // Bar and label
          this.dom.timerBar.style.width = `${ratio * 100}%`;
          this.dom.timerText.textContent = `${(remainingMs / 1000).toFixed(1)}s`;

          // Color shift
          if (ratio < 0.25) {
            this.dom.timerBar.className = 'h-full bg-rose-500 rounded-full transition-all duration-75 origin-left';
            this.dom.timerText.className = 'font-mono-numbers text-xs font-bold text-rose-400 w-9 text-right';
          } else if (ratio < 0.5) {
            this.dom.timerBar.className = 'h-full bg-amber-400 rounded-full transition-all duration-75 origin-left';
            this.dom.timerText.className = 'font-mono-numbers text-xs font-bold text-amber-400 w-9 text-right';
          } else {
            this.dom.timerBar.className = 'h-full bg-indigo-500 rounded-full transition-all duration-75 origin-left';
            this.dom.timerText.className = 'font-mono-numbers text-xs font-bold text-zinc-300 w-9 text-right';
          }

          if (remainingMs <= 0) {
            this.handleTimeout();
          } else {
            this.animFrameId = requestAnimationFrame(updateTimer);
          }
        };

        this.animFrameId = requestAnimationFrame(updateTimer);
      } else if (this.mode === 'classic') {
        this.dom.timerBar.style.width = `${((this.totalQuestionsAnswered) / this.classicTarget) * 100}%`;
        this.dom.timerText.textContent = `${this.totalQuestionsAnswered}/${this.classicTarget}`;
      }
    }

    generateNextQuestion() {
      // If error drill session
      if (this.mode === 'error_drill' && this.errorDrillPool.length > 0) {
        const item = this.errorDrillPool.pop();
        return {
          category: `Weak Spot (${item.category || 'Review'})`,
          type: item.type === 'mcq' ? 'mcq' : 'direct',
          prompt: item.prompt,
          answer: String(item.answer),
          acceptedAnswers: [String(item.answer)],
          subtext: item.explanation || 'Answer carefully to graduate',
          explanation: item.explanation || `Answer: ${item.answer}`
        };
      }

      // Standard Module Generators
      if (this.currentModule === 'tables') {
        return QuestionGenerators.tables(this.selectedTables, this.maxMultiplier);
      } else if (this.currentModule === 'powers') {
        const opts = {
          sq1_25: document.getElementById('chkSquares1_25').checked,
          sq26_50: document.getElementById('chkSquares26_50').checked,
          cu1_15: document.getElementById('chkCubes1_15').checked,
          cu16_30: document.getElementById('chkCubes16_30').checked,
          includeRoots: document.getElementById('chkIncludeRoots').checked
        };
        return QuestionGenerators.powers(opts);
      } else if (this.currentModule === 'fractions') {
        const opts = {
          unit: document.getElementById('chkUnitFractions').checked,
          common: document.getElementById('chkCommonFractions').checked,
          bidirectional: document.getElementById('chkPercentToFraction').checked
        };
        return QuestionGenerators.fractions(opts);
      } else if (this.currentModule === 'arithmetic') {
        const opts = {
          add2: document.getElementById('chkAdd2Digit').checked,
          add3: document.getElementById('chkAdd3Digit').checked,
          sub2: document.getElementById('chkSub2Digit').checked,
          mult2x2: document.getElementById('chkMult2x2').checked,
          pctShortcut: document.getElementById('chkPercentShortcut').checked
        };
        return QuestionGenerators.arithmetic(opts);
      } else if (this.currentModule === 'elimination') {
        const opts = {
          unit: document.getElementById('chkUnitDigit').checked,
          tens: document.getElementById('chkTensDigit').checked,
          root: document.getElementById('chkDigitalRoot').checked,
          approx: document.getElementById('chkApprox').checked
        };
        return QuestionGenerators.elimination(opts);
      }

      return QuestionGenerators.tables(this.selectedTables, 12);
    }

    // -----------------------------------------------------------
    // ANSWER PROCESSING & FEEDBACK
    // -----------------------------------------------------------
    checkAutoSubmit() {
      const val = this.dom.mathInput.value.trim();
      if (!val || !this.currentQuestion) return;

      const ans = String(this.currentQuestion.answer).trim();
      const accepted = this.currentQuestion.acceptedAnswers || [ans];

      // Exact match check
      if (accepted.some(a => a.toLowerCase() === val.toLowerCase())) {
        this.submitDirectAnswer();
      }
    }

    submitDirectAnswer() {
      if (this.isProcessingAnswer || !this.currentQuestion) return;
      const userVal = this.dom.mathInput.value.trim().toLowerCase();
      if (!userVal) return;

      const accepted = (this.currentQuestion.acceptedAnswers || [String(this.currentQuestion.answer)]).map(a => a.trim().toLowerCase());
      const isCorrect = accepted.includes(userVal);
      this.finalizeQuestionAnswer(isCorrect, userVal);
    }

    handleMcqSelect(choiceIndex) {
      if (this.isProcessingAnswer || !this.currentQuestion || this.currentQuestion.type !== 'mcq') return;
      const isCorrect = choiceIndex === this.currentQuestion.correctIndex;
      
      // Highlight choice
      const btn = document.querySelector(`[data-option-idx="${choiceIndex}"]`);
      if (btn) {
        if (isCorrect) {
          btn.classList.add('bg-emerald-500/20', 'border-emerald-500', 'text-emerald-300');
        } else {
          btn.classList.add('bg-rose-500/20', 'border-rose-500', 'text-rose-300');
          // Also highlight correct choice
          const correctBtn = document.querySelector(`[data-option-idx="${this.currentQuestion.correctIndex}"]`);
          if (correctBtn) correctBtn.classList.add('bg-emerald-500/20', 'border-emerald-500', 'text-emerald-300');
        }
      }

      // Show CGL Shortcut Hint banner
      if (this.currentQuestion.explanation) {
        this.dom.cglShortcutBanner.classList.remove('hidden');
        this.dom.cglShortcutText.textContent = this.currentQuestion.explanation;
      }

      this.finalizeQuestionAnswer(isCorrect, choiceIndex);
    }

    handleTimeout() {
      if (this.isProcessingAnswer || !this.currentQuestion) return;
      this.finalizeQuestionAnswer(false, 'TIMEOUT');
    }

    finalizeQuestionAnswer(isCorrect, userVal) {
      this.isProcessingAnswer = true;
      if (this.animFrameId) cancelAnimationFrame(this.animFrameId);

      const reactionTimeMs = Date.now() - this.questionStartTime;
      this.totalQuestionsAnswered += 1;
      this.totalResponseTimeMs += reactionTimeMs;

      if (isCorrect) {
        this.score += 1;
        this.streak += 1;
        if (this.streak > this.bestStreakInSession) this.bestStreakInSession = this.streak;
        
        sound.correct();
        sound.vibrate([30, 20, 30]);

        if (this.streak > 0 && this.streak % 10 === 0) {
          sound.streakMilestone();
        }

        // Error bank graduation check
        errorBank.recordSuccess(this.currentQuestion.prompt);

        // Visual success flash
        this.dom.inputBoxWrapper.className = 'relative flex items-center justify-center w-full h-14 sm:h-16 rounded-2xl bg-emerald-950/40 border-2 border-emerald-500 shadow-inner transition-colors';
        
        // Progress to next question swiftly
        const delay = this.currentQuestion.type === 'mcq' ? 800 : 180;
        setTimeout(() => {
          this.updateSessionStatsHeader();
          this.nextQuestion();
        }, delay);

      } else {
        this.streak = 0;
        sound.wrong();
        sound.vibrate([100]);

        // Log mistake into Error Bank
        errorBank.recordMistake(this.currentQuestion);
        this.sessionMistakes.push({
          q: this.currentQuestion.prompt,
          ans: this.currentQuestion.answer,
          user: userVal,
          explanation: this.currentQuestion.explanation
        });
        this.updateErrorBadges();

        // Visual error shake & flash correct answer banner
        this.dom.inputBoxWrapper.className = 'relative flex items-center justify-center w-full h-14 sm:h-16 rounded-2xl bg-rose-950/40 border-2 border-rose-500 shadow-inner animate-shake transition-colors';
        
        this.dom.feedbackText.textContent = userVal === 'TIMEOUT' ? '⏰ Time Out' : '❌ Wrong';
        this.dom.feedbackAnswer.textContent = `Correct: ${this.currentQuestion.answer}`;
        this.dom.drillFeedbackBanner.className = 'absolute -bottom-2 inset-x-2 py-2 px-3 rounded-xl border border-rose-500/50 bg-rose-950/90 text-rose-200 flex items-center justify-between text-xs font-semibold opacity-100 transition-opacity z-20 shadow-lg';

        // Flash answer for 0.8s as requested
        const delay = this.currentQuestion.type === 'mcq' ? 1200 : 850;
        setTimeout(() => {
          this.updateSessionStatsHeader();
          this.nextQuestion();
        }, delay);
      }

      // Record lifetime stats
      lifetimeStats.record(isCorrect, reactionTimeMs, this.streak);
    }

    updateSessionStatsHeader() {
      this.dom.drillStreak.textContent = this.streak;
      this.dom.drillScore.textContent = this.score;
      if (this.mode === 'classic') {
        this.dom.drillTotalCount.textContent = this.classicTarget;
      } else {
        this.dom.drillTotalCount.textContent = this.totalQuestionsAnswered;
      }
    }

    // -----------------------------------------------------------
    // KEYBOARD & INPUT ROUTING
    // -----------------------------------------------------------
    handleGlobalKeyDown(e) {
      // Esc to Pause/Resume
      if (e.key === 'Escape') {
        e.preventDefault();
        if (this.sessionActive) {
          if (this.sessionPaused) this.resumeSession();
          else this.pauseSession();
        }
        return;
      }

      // If paused, space resumes
      if (this.sessionPaused && e.code === 'Space') {
        e.preventDefault();
        this.resumeSession();
        return;
      }

      if (!this.sessionActive || this.sessionPaused) return;

      // In MCQ Mode: keys 1, 2, 3, 4 trigger option A, B, C, D
      if (this.currentQuestion && this.currentQuestion.type === 'mcq') {
        if (['1', '2', '3', '4'].includes(e.key)) {
          e.preventDefault();
          this.handleMcqSelect(parseInt(e.key, 10) - 1);
          return;
        }
      }

      // In Direct Input Mode: Enter submits
      if (e.key === 'Enter') {
        e.preventDefault();
        this.submitDirectAnswer();
        return;
      }

      // Ensure focus on input field
      if (this.currentQuestion && this.currentQuestion.type === 'direct') {
        if (document.activeElement !== this.dom.mathInput) {
          this.dom.mathInput.focus();
        }
      }
    }

    handleKeypadInput(key) {
      if (!this.sessionActive || !this.currentQuestion || this.currentQuestion.type !== 'direct') return;
      this.dom.mathInput.value += key;
      sound.tick();
      if (this.autoSubmit) this.checkAutoSubmit();
    }

    handleKeypadBackspace() {
      if (!this.sessionActive || !this.currentQuestion || this.currentQuestion.type !== 'direct') return;
      this.dom.mathInput.value = this.dom.mathInput.value.slice(0, -1);
      sound.tick();
    }

    // -----------------------------------------------------------
    // PAUSE & SUMMARY
    // -----------------------------------------------------------
    pauseSession() {
      this.sessionPaused = true;
      this.dom.modalPause.classList.remove('hidden');
    }

    resumeSession() {
      this.sessionPaused = false;
      this.dom.modalPause.classList.add('hidden');
      if (this.currentQuestion && this.currentQuestion.type === 'direct') {
        this.dom.mathInput.focus();
      }
    }

    exitSessionToSetup() {
      this.sessionActive = false;
      this.sessionPaused = false;
      if (this.animFrameId) cancelAnimationFrame(this.animFrameId);
      if (this.marathonInterval) clearInterval(this.marathonInterval);
      this.dom.modalPause.classList.add('hidden');
      this.showView('setup');
    }

    endSession() {
      this.sessionActive = false;
      if (this.animFrameId) cancelAnimationFrame(this.animFrameId);
      if (this.marathonInterval) clearInterval(this.marathonInterval);

      const d = this.dom;
      const total = this.totalQuestionsAnswered || 1;
      const acc = Math.round((this.score / total) * 100);
      const avgReaction = total > 0 ? (this.totalResponseTimeMs / total / 1000).toFixed(2) : '0.00';

      d.summaryModeLabel.textContent = `${this.mode.toUpperCase()} · ${this.currentModule.toUpperCase()}`;
      d.sumAccuracy.textContent = `${acc}%`;
      d.sumScore.textContent = `${this.score}/${this.totalQuestionsAnswered} correct`;
      d.sumAvgSpeed.textContent = `${avgReaction}s`;
      d.sumBestStreak.textContent = `${this.bestStreakInSession}`;
      d.sumErrorsLogged.textContent = `${this.sessionMistakes.length}`;
      if (d.sumErrorBadge) d.sumErrorBadge.textContent = errorBank.getCount();

      d.modalSummary.classList.remove('hidden');
      this.updateErrorBadges();
    }

    // -----------------------------------------------------------
    // ERROR BANK & STATS MODALS
    // -----------------------------------------------------------
    openErrorBankModal() {
      this.renderErrorBankItems();
      this.dom.modalErrorBank.classList.remove('hidden');
    }

    renderErrorBankItems() {
      const items = errorBank.load();
      const list = this.dom.errorBankList;
      list.innerHTML = '';

      if (items.length === 0) {
        list.innerHTML = `
          <div class="py-8 text-center text-zinc-400">
            <div class="text-3xl mb-2">🎉</div>
            <div class="text-sm font-semibold text-zinc-300">Clean Slate!</div>
            <div class="text-xs text-zinc-400 mt-1">No logged mistakes. Any misses will be queued here for spaced repetition.</div>
          </div>
        `;
        return;
      }

      items.forEach((item) => {
        const div = document.createElement('div');
        div.className = 'p-3 rounded-xl bg-zinc-950/60 border border-zinc-800 flex items-center justify-between gap-3';
        div.innerHTML = `
          <div>
            <div class="text-sm font-bold text-white font-mono-numbers">${item.prompt}</div>
            <div class="text-xs text-emerald-400 font-semibold mt-0.5">${item.explanation || 'Ans: ' + item.answer}</div>
          </div>
          <div class="text-right shrink-0">
            <span class="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-zinc-800 text-zinc-400">
              ${item.consecutiveCorrect || 0}/2 Correct
            </span>
          </div>
        `;
        list.appendChild(div);
      });
    }

    openStatsModal() {
      this.renderStatsModal();
      this.dom.modalStats.classList.remove('hidden');
    }

    renderStatsModal() {
      const s = lifetimeStats.load();
      const d = this.dom;
      d.statTotalAnswered.textContent = s.totalAnswered.toLocaleString();
      const acc = s.totalAnswered > 0 ? Math.round((s.totalCorrect / s.totalAnswered) * 100) : 0;
      d.statLifetimeAccuracy.textContent = `${acc}%`;
      d.statBestStreak.textContent = s.bestStreak.toLocaleString();
      const avg = s.totalAnswered > 0 ? Math.round(s.totalTimeMs / s.totalAnswered) : 0;
      d.statAvgReaction.textContent = `${avg} ms`;
    }
  }

  // Initialize on DOMContentLoaded
  document.addEventListener('DOMContentLoaded', () => {
    window.__mathApp = new MathHubApp();
  });
})();
