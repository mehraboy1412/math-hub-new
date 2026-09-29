// Math Practice Hub - SSC CGL Calculation Trainer
// Ultra-fast, competitive-exam grade mental math engine
// Bright Alertness Canvas & Multi-Step Flow with Fraction Lab Suite

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
  // SPACES & CONSTANTS FOR SSC CGL FRACTIONS
  // -------------------------------------------------------------
  const SSC_FRACTIONS = [
    { fraction: '1/2', percent: '50%', mixed: '50%', decimals: ['50', '50.0'], val: 0.5, category: 'unit' },
    { fraction: '1/3', percent: '33.33%', mixed: '33 1/3%', decimals: ['33.33', '33.3'], val: 0.3333, category: 'unit' },
    { fraction: '1/4', percent: '25%', mixed: '25%', decimals: ['25', '25.0'], val: 0.25, category: 'unit' },
    { fraction: '1/5', percent: '20%', mixed: '20%', decimals: ['20', '20.0'], val: 0.2, category: 'unit' },
    { fraction: '1/6', percent: '16.66%', mixed: '16 2/3%', decimals: ['16.66', '16.67'], val: 0.1666, category: 'unit' },
    { fraction: '1/7', percent: '14.28%', mixed: '14 2/7%', decimals: ['14.28', '14.29'], val: 0.1428, category: 'unit' },
    { fraction: '1/8', percent: '12.5%', mixed: '12 1/2%', decimals: ['12.5', '12.50'], val: 0.125, category: 'unit' },
    { fraction: '1/9', percent: '11.11%', mixed: '11 1/9%', decimals: ['11.11'], val: 0.1111, category: 'unit' },
    { fraction: '1/10', percent: '10%', mixed: '10%', decimals: ['10', '10.0'], val: 0.1, category: 'unit' },
    { fraction: '1/11', percent: '9.09%', mixed: '9 1/11%', decimals: ['9.09'], val: 0.0909, category: 'unit' },
    { fraction: '1/12', percent: '8.33%', mixed: '8 1/3%', decimals: ['8.33'], val: 0.0833, category: 'unit' },
    { fraction: '1/13', percent: '7.69%', mixed: '7 9/13%', decimals: ['7.69'], val: 0.0769, category: 'unit' },
    { fraction: '1/14', percent: '7.14%', mixed: '7 1/7%', decimals: ['7.14'], val: 0.0714, category: 'unit' },
    { fraction: '1/15', percent: '6.66%', mixed: '6 2/3%', decimals: ['6.66', '6.67'], val: 0.0666, category: 'unit' },
    { fraction: '1/16', percent: '6.25%', mixed: '6 1/4%', decimals: ['6.25'], val: 0.0625, category: 'unit' },
    { fraction: '1/17', percent: '5.88%', mixed: '5 15/17%', decimals: ['5.88'], val: 0.0588, category: 'unit' },
    { fraction: '1/18', percent: '5.55%', mixed: '5 5/9%', decimals: ['5.55'], val: 0.0555, category: 'unit' },
    { fraction: '1/19', percent: '5.26%', mixed: '5 5/19%', decimals: ['5.26'], val: 0.0526, category: 'unit' },
    { fraction: '1/20', percent: '5%', mixed: '5%', decimals: ['5', '5.0'], val: 0.05, category: 'unit' },
    { fraction: '1/21', percent: '4.76%', mixed: '4 16/21%', decimals: ['4.76'], val: 0.0476, category: 'unit' },
    { fraction: '1/22', percent: '4.54%', mixed: '4 6/11%', decimals: ['4.54'], val: 0.0454, category: 'unit' },
    { fraction: '1/23', percent: '4.34%', mixed: '4 8/23%', decimals: ['4.34'], val: 0.0434, category: 'unit' },
    { fraction: '1/24', percent: '4.16%', mixed: '4 1/6%', decimals: ['4.16', '4.17'], val: 0.0416, category: 'unit' },
    { fraction: '1/25', percent: '4%', mixed: '4%', decimals: ['4', '4.0'], val: 0.04, category: 'unit' },
    // Popular SSC Multi-Fractions
    { fraction: '2/3', percent: '66.66%', mixed: '66 2/3%', decimals: ['66.66', '66.67'], val: 0.6666, category: 'ssc' },
    { fraction: '3/4', percent: '75%', mixed: '75%', decimals: ['75', '75.0'], val: 0.75, category: 'ssc' },
    { fraction: '2/7', percent: '28.57%', mixed: '28 4/7%', decimals: ['28.57'], val: 0.2857, category: 'ssc' },
    { fraction: '3/7', percent: '42.85%', mixed: '42 6/7%', decimals: ['42.85'], val: 0.4285, category: 'ssc' },
    { fraction: '4/7', percent: '57.14%', mixed: '57 1/7%', decimals: ['57.14'], val: 0.5714, category: 'ssc' },
    { fraction: '5/7', percent: '71.42%', mixed: '71 3/7%', decimals: ['71.42'], val: 0.7142, category: 'ssc' },
    { fraction: '3/8', percent: '37.5%', mixed: '37 1/2%', decimals: ['37.5', '37.50'], val: 0.375, category: 'ssc' },
    { fraction: '5/8', percent: '62.5%', mixed: '62 1/2%', decimals: ['62.5', '62.50'], val: 0.625, category: 'ssc' },
    { fraction: '7/8', percent: '87.5%', mixed: '87 1/2%', decimals: ['87.5', '87.50'], val: 0.875, category: 'ssc' },
    { fraction: '5/6', percent: '83.33%', mixed: '83 1/3%', decimals: ['83.33'], val: 0.8333, category: 'ssc' },
    { fraction: '7/12', percent: '58.33%', mixed: '58 1/3%', decimals: ['58.33'], val: 0.5833, category: 'ssc' },
    { fraction: '11/12', percent: '91.66%', mixed: '91 2/3%', decimals: ['91.66'], val: 0.9166, category: 'ssc' }
  ];

  const CGL_PRIMES = [17, 19, 23, 29, 31, 37, 41, 43, 47];

  function getDigitalRoot(n) {
    let num = Math.abs(Math.round(n));
    if (num === 0) return 0;
    return 1 + ((num - 1) % 9);
  }

  function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function shuffleArray(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function gcd(a, b) {
    let x = Math.abs(Math.round(a));
    let y = Math.abs(Math.round(b));
    while (y) {
      const t = y;
      y = x % y;
      x = t;
    }
    return x || 1;
  }

  function simplifyFraction(num, den) {
    if (!den || den === 0) return { num: 0, den: 1 };
    const divisor = gcd(num, den);
    return { num: Math.round(num / divisor), den: Math.round(den / divisor) };
  }

  function fractionToMixedString(num, den) {
    if (!den || den === 0) return '0%';
    const pct = (num / den) * 100;
    const whole = Math.floor(pct);
    const rem = Math.round((pct - whole) * den);
    if (rem === 0 || Math.abs(pct - whole) < 0.0001) {
      return `${whole}%`;
    }
    const simp = simplifyFraction(rem, den);
    return `${whole} ${simp.num}/${simp.den}%`;
  }

  function parseMixedFractionString(str) {
    if (!str || typeof str !== 'string') return null;
    const clean = str.trim().replace(/%/g, '').trim();
    if (!clean) return null;

    // Mixed fraction "14 2/7" or "14-2/7" or "14_2/7"
    const mixedMatch = clean.match(/^(\d+)[\s\-_\+](\d+)\s*\/\s*(\d+)$/);
    if (mixedMatch) {
      const whole = parseInt(mixedMatch[1], 10);
      const num = parseInt(mixedMatch[2], 10);
      const den = parseInt(mixedMatch[3], 10);
      if (den > 0) {
        return {
          isMixed: true,
          whole,
          num,
          den,
          value: whole + (num / den),
          normalized: `${whole} ${num}/${den}`
        };
      }
    }

    // Simple fraction "1/7"
    const fracMatch = clean.match(/^(\d+)\s*\/\s*(\d+)$/);
    if (fracMatch) {
      const num = parseInt(fracMatch[1], 10);
      const den = parseInt(fracMatch[2], 10);
      if (den > 0) {
        return {
          isMixed: false,
          whole: 0,
          num,
          den,
          value: num / den,
          normalized: `${num}/${den}`
        };
      }
    }

    // Pure number / decimal e.g. "14.28"
    const numVal = parseFloat(clean);
    if (!isNaN(numVal)) {
      return {
        isMixed: false,
        whole: Math.floor(numVal),
        num: 0,
        den: 1,
        value: numVal,
        normalized: String(numVal)
      };
    }

    return null;
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

    fractions(options) {
      let subset = SSC_FRACTIONS;
      if (!options.common) {
        subset = subset.filter(f => f.category === 'unit');
      }
      const item = subset[randInt(0, subset.length - 1)];
      const askPercentToFrac = options.bidirectional && Math.random() < 0.5;

      if (askPercentToFrac) {
        // Test Percentage to Fraction: can ask either mixed fraction or decimal percentage!
        const useMixedPrompt = Math.random() < 0.5 && item.mixed !== item.percent;
        const promptLabel = useMixedPrompt ? item.mixed : item.percent;
        return {
          category: 'Percentage to Fraction',
          type: 'direct',
          prompt: `${promptLabel} = ?`,
          formulaDisplay: `${promptLabel} = ?`,
          answer: item.fraction,
          acceptedAnswers: [
            item.fraction,
            item.fraction.replace('/', ' / '),
            item.fraction.replace('/', ' /'),
            item.fraction.replace('/', '/ ')
          ],
          targetFractionRatio: item.val,
          subtext: 'Enter reduced fraction (e.g. 1/4 or 3/8)',
          hasFractionKeys: true,
          explanation: `${item.fraction} = ${item.percent} = ${item.mixed}`
        };
      } else {
        // Test Fraction to Percentage: accept BOTH mixed fraction (e.g. 14 2/7) and decimal (e.g. 14.28)
        const primaryAns = item.mixed.replace('%', '').trim();
        const mixedRaw = item.mixed.replace('%', '').trim();
        const mixedHyphen = mixedRaw.replace(' ', '-');
        
        const accepted = [
          mixedRaw,
          item.mixed,
          mixedHyphen,
          `${mixedHyphen}%`,
          mixedRaw.replace(' ', ''),
          ...item.decimals,
          ...item.decimals.map(d => `${d}%`),
          item.percent,
          item.percent.replace('%', '').trim()
        ];

        return {
          category: 'Fraction to Percentage',
          type: 'direct',
          prompt: `${item.fraction} = ? %`,
          formulaDisplay: `${item.fraction}`,
          answer: `${item.mixed} (or ${item.decimals[0]}%)`,
          acceptedAnswers: accepted,
          targetPercentValue: item.val * 100,
          subtext: 'Enter as mixed fraction (e.g. 16 2/3) or decimal (16.66)',
          hasFractionKeys: true,
          explanation: `${item.fraction} = ${item.mixed} = ${item.percent}`
        };
      }
    },

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
          subtext: 'Left-to-right mental addition: split tens, then units',
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
          subtext: 'Left-to-right mental split: subtract tens first, then units',
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

    elimination(options) {
      const techniques = [];
      if (options.unit) techniques.push('unit');
      if (options.tens) techniques.push('tens');
      if (options.root) techniques.push('root');
      if (options.approx) techniques.push('approx');

      const tech = techniques.length > 0 ? techniques[randInt(0, techniques.length - 1)] : 'unit';

      if (tech === 'unit') {
        const a = randInt(123, 789);
        const b = randInt(12, 98);
        const c = randInt(111, 456);
        const d = randInt(11, 55);
        const correctVal = (a * b) + (c * d);
        const correctUnit = Math.abs(correctVal % 10);

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
          explanation: `Unit digit: (${a%10} × ${b%10}) + (${c%10} × ${d%10}) = ${(a%10)*(b%10)} + ${(c%10)*(d%10)} ➔ ends in ${correctUnit}. Option ${String.fromCharCode(65 + correctIdx)} matches!`
        };
      } else if (tech === 'root') {
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
  // APP STATE CONTROLLER & MULTI-STEP WIZARD
  // -------------------------------------------------------------
  class MathHubApp {
    constructor() {
      // Wizard Step state: 1 (Topic), 2 (Scope), 3 (Mode & Pace)
      this.currentStep = 1;

      // Configuration
      this.mode = 'blitz';
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

      this.animFrameId = null;
      this.marathonInterval = null;

      this.cacheDom();
      this.bindEvents();
      this.renderTableNumbersGrid();
      this.renderFractionLabTable('all');
      this.updateErrorBadges();
      this.updateSoundIcon();
      this.updateWizardStepView();
    }

    cacheDom() {
      this.dom = {
        viewSetup: document.getElementById('viewSetup'),
        viewDrill: document.getElementById('viewDrill'),
        modalPause: document.getElementById('modalPause'),
        modalSummary: document.getElementById('modalSummary'),
        modalErrorBank: document.getElementById('modalErrorBank'),
        modalStats: document.getElementById('modalStats'),
        modalFractionLab: document.getElementById('modalFractionLab'),

        // Stepper Header
        stepBadgeNum: document.getElementById('stepBadgeNum'),
        stepTitle: document.getElementById('stepTitle'),
        stepProgressText: document.getElementById('stepProgressText'),
        stepProgressBar: document.getElementById('stepProgressBar'),
        step1Container: document.getElementById('step1Container'),
        step2Container: document.getElementById('step2Container'),
        step3Container: document.getElementById('step3Container'),
        btnWizardBack: document.getElementById('btnWizardBack'),
        btnWizardNext: document.getElementById('btnWizardNext'),
        btnStartSprint: document.getElementById('btnStartSprint'),

        // Header controls
        btnNavHome: document.getElementById('btnNavHome'),
        btnOpenFractionLab: document.getElementById('btnOpenFractionLab'),
        btnOpenErrorBank: document.getElementById('btnOpenErrorBank'),
        btnOpenStats: document.getElementById('btnOpenStats'),
        btnToggleSound: document.getElementById('btnToggleSound'),
        iconSoundOn: document.getElementById('iconSoundOn'),
        iconSoundOff: document.getElementById('iconSoundOff'),
        headerErrorBadge: document.getElementById('headerErrorBadge'),
        setupErrorCount: document.getElementById('setupErrorCount'),
        setupErrorCountText: document.getElementById('setupErrorCountText'),
        btnQuickDrillErrors: document.getElementById('btnQuickDrillErrors'),

        // Step 2 Scope Elements
        step2ModuleHeading: document.getElementById('step2ModuleHeading'),
        step2Badge: document.getElementById('step2Badge'),
        scopePanelTables: document.getElementById('scopePanelTables'),
        scopePanelPowers: document.getElementById('scopePanelPowers'),
        scopePanelFractions: document.getElementById('scopePanelFractions'),
        scopePanelArithmetic: document.getElementById('scopePanelArithmetic'),
        scopePanelElimination: document.getElementById('scopePanelElimination'),
        tableNumbersGrid: document.getElementById('tableNumbersGrid'),
        selectedTablesCount: document.getElementById('selectedTablesCount'),
        btnStudyFractionsLink: document.getElementById('btnStudyFractionsLink'),

        // Step 3 Preferences
        chkAutoSubmit: document.getElementById('chkAutoSubmit'),
        btnKeypadVirtual: document.getElementById('btnKeypadVirtual'),
        btnKeypadNative: document.getElementById('btnKeypadNative'),

        // Drill Session Elements
        drillStreak: document.getElementById('drillStreak'),
        timerBar: document.getElementById('timerBar'),
        timerText: document.getElementById('timerText'),
        timerContainer: document.getElementById('timerContainer'),
        drillScore: document.getElementById('drillScore'),
        drillTotalCount: document.getElementById('drillTotalCount'),
        btnPauseSession: document.getElementById('btnPauseSession'),
        btnResumeSession: document.getElementById('btnResumeSession'),
        btnExitSession: document.getElementById('btnExitSession'),

        // Question stage
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

        // Fraction Lab Elements
        btnCloseFractionLab: document.getElementById('btnCloseFractionLab'),
        calcFractionInput: document.getElementById('calcFractionInput'),
        calcPercentInput: document.getElementById('calcPercentInput'),
        calcResultDisplay: document.getElementById('calcResultDisplay'),
        searchFractionTable: document.getElementById('searchFractionTable'),
        fractionTableBody: document.getElementById('fractionTableBody'),
        btnLaunchFractionSprintFromLab: document.getElementById('btnLaunchFractionSprintFromLab'),

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

      // Nav Home
      d.btnNavHome.addEventListener('click', () => {
        if (this.sessionActive) {
          if (confirm('Leave current practice drill?')) this.exitSessionToSetup();
        } else {
          this.currentStep = 1;
          this.updateWizardStepView();
          this.showView('setup');
        }
      });

      // Sound Toggle
      d.btnToggleSound.addEventListener('click', () => {
        sound.toggle();
        this.updateSoundIcon();
      });

      // Fraction Lab Modal
      d.btnOpenFractionLab.addEventListener('click', () => {
        this.openFractionLabModal();
      });
      d.btnCloseFractionLab.addEventListener('click', () => {
        d.modalFractionLab.classList.add('hidden');
      });
      if (d.btnStudyFractionsLink) {
        d.btnStudyFractionsLink.addEventListener('click', () => {
          this.openFractionLabModal();
        });
      }
      d.btnLaunchFractionSprintFromLab.addEventListener('click', () => {
        d.modalFractionLab.classList.add('hidden');
        this.currentModule = 'fractions';
        this.startSession();
      });

      // Fraction Lab Calculator Input Handlers
      d.calcFractionInput.addEventListener('input', () => this.handleFractionCalcFromFrac());
      d.calcPercentInput.addEventListener('input', () => this.handleFractionCalcFromPercent());
      d.searchFractionTable.addEventListener('input', (e) => this.filterFractionTable(e.target.value));

      document.querySelectorAll('.fl-filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          document.querySelectorAll('.fl-filter-btn').forEach(b => {
            b.className = 'fl-filter-btn px-2.5 py-1 text-xs font-bold rounded-md bg-slate-100 text-slate-700 hover:bg-slate-200';
          });
          btn.className = 'fl-filter-btn px-2.5 py-1 text-xs font-bold rounded-md bg-amber-500 text-white shadow-2xs';
          this.renderFractionLabTable(btn.dataset.flFilter, d.searchFractionTable.value);
        });
      });

      // Error Bank
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
      d.btnQuickDrillErrors.addEventListener('click', () => this.startErrorDrillSession());

      // Stats Modal
      d.btnOpenStats.addEventListener('click', () => this.openStatsModal());
      d.btnCloseStats.addEventListener('click', () => d.modalStats.classList.add('hidden'));
      d.btnDoneStats.addEventListener('click', () => d.modalStats.classList.add('hidden'));
      d.btnResetStats.addEventListener('click', () => {
        if (confirm('Reset all lifetime accuracy and speed statistics?')) {
          lifetimeStats.reset();
          this.renderStatsModal();
        }
      });

      // Wizard Stepper Actions
      d.btnWizardNext.addEventListener('click', () => {
        if (this.currentStep < 3) {
          this.currentStep += 1;
          this.updateWizardStepView();
          sound.tick();
        }
      });

      d.btnWizardBack.addEventListener('click', () => {
        if (this.currentStep > 1) {
          this.currentStep -= 1;
          this.updateWizardStepView();
          sound.tick();
        }
      });

      d.btnStartSprint.addEventListener('click', () => this.startSession());

      // Step 1: Module Cards Selection
      document.querySelectorAll('.module-card').forEach(card => {
        card.addEventListener('click', () => {
          document.querySelectorAll('.module-card').forEach(c => {
            c.classList.remove('border-amber-500', 'bg-amber-50/60');
            c.classList.add('border-slate-200', 'bg-white');
          });
          card.classList.remove('border-slate-200', 'bg-white');
          card.classList.add('border-amber-500', 'bg-amber-50/60');
          this.currentModule = card.dataset.module;
          sound.tick();
        });
      });

      // Step 2: Multiplier Depth
      document.querySelectorAll('.depth-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          document.querySelectorAll('.depth-btn').forEach(b => {
            b.className = 'depth-btn px-2 py-0.5 rounded text-xs font-bold text-slate-600 hover:text-slate-900';
          });
          btn.className = 'depth-btn px-2 py-0.5 rounded text-xs font-bold bg-amber-500 text-white shadow-xs';
          this.maxMultiplier = parseInt(btn.dataset.multDepth, 10);
          sound.tick();
        });
      });

      // Step 2: Quick Chips for Tables
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
          sound.tick();
        });
      });

      // Step 3: Mode Cards Selection
      document.querySelectorAll('.mode-select-card').forEach(card => {
        card.addEventListener('click', () => {
          document.querySelectorAll('.mode-select-card').forEach(c => {
            c.classList.remove('border-amber-500', 'bg-amber-50/60');
            c.classList.add('border-slate-200', 'bg-white');
          });
          card.classList.remove('border-slate-200', 'bg-white');
          card.classList.add('border-amber-500', 'bg-amber-50/60');
          this.mode = card.dataset.modeCard;
          sound.tick();
        });
      });

      // Blitz Time buttons
      document.querySelectorAll('.blitz-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          document.querySelectorAll('.blitz-btn').forEach(b => {
            b.className = 'blitz-btn px-2.5 py-1 rounded-md text-xs font-bold bg-white text-slate-700 border border-slate-300 hover:border-amber-400';
          });
          btn.className = 'blitz-btn px-2.5 py-1 rounded-md text-xs font-bold bg-amber-500 text-white border border-amber-500 shadow-2xs';
          this.blitzDuration = parseInt(btn.dataset.blitz, 10);
          this.mode = 'blitz';
          this.selectModeCardInDom('blitz');
          sound.tick();
        });
      });

      // Marathon Time buttons
      document.querySelectorAll('.marathon-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          document.querySelectorAll('.marathon-btn').forEach(b => {
            b.className = 'marathon-btn px-2.5 py-1 rounded-md text-xs font-bold bg-white text-slate-700 border border-slate-300 hover:border-amber-400';
          });
          btn.className = 'marathon-btn px-2.5 py-1 rounded-md text-xs font-bold bg-amber-500 text-white border border-amber-500 shadow-2xs';
          this.marathonDuration = parseInt(btn.dataset.marathon, 10);
          this.mode = 'marathon';
          this.selectModeCardInDom('marathon');
          sound.tick();
        });
      });

      // Classic Count buttons
      document.querySelectorAll('.classic-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          document.querySelectorAll('.classic-btn').forEach(b => {
            b.className = 'classic-btn px-2.5 py-1 rounded-md text-xs font-bold bg-white text-slate-700 border border-slate-300 hover:border-amber-400';
          });
          btn.className = 'classic-btn px-2.5 py-1 rounded-md text-xs font-bold bg-amber-500 text-white border border-amber-500 shadow-2xs';
          this.classicTarget = parseInt(btn.dataset.classic, 10);
          this.mode = 'classic';
          this.selectModeCardInDom('classic');
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
        d.btnKeypadVirtual.className = 'px-2.5 py-1 rounded text-xs font-bold bg-amber-500 text-white shadow-2xs';
        d.btnKeypadNative.className = 'px-2.5 py-1 rounded text-xs font-bold text-slate-600 hover:text-slate-900';
        d.virtualKeypad.classList.remove('hidden');
        sound.tick();
      });

      d.btnKeypadNative.addEventListener('click', () => {
        this.useNativeKeypad = true;
        d.btnKeypadNative.className = 'px-2.5 py-1 rounded text-xs font-bold bg-amber-500 text-white shadow-2xs';
        d.btnKeypadVirtual.className = 'px-2.5 py-1 rounded text-xs font-bold text-slate-600 hover:text-slate-900';
        d.virtualKeypad.classList.add('hidden');
        d.mathInput.focus();
        sound.tick();
      });

      // Keyboard routing
      window.addEventListener('keydown', (e) => this.handleGlobalKeyDown(e));

      // Keypad buttons
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

      // MCQ option buttons
      document.querySelectorAll('.mcq-option-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          const idx = parseInt(btn.dataset.optionIdx, 10);
          this.handleMcqSelect(idx);
        });
      });

      // Direct Input typing & auto-submit
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

      // Summary
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

    selectModeCardInDom(mode) {
      document.querySelectorAll('.mode-select-card').forEach(c => {
        if (c.dataset.modeCard === mode) {
          c.classList.remove('border-slate-200', 'bg-white');
          c.classList.add('border-amber-500', 'bg-amber-50/60');
        } else {
          c.classList.remove('border-amber-500', 'bg-amber-50/60');
          c.classList.add('border-slate-200', 'bg-white');
        }
      });
    }

    updateWizardStepView() {
      const d = this.dom;
      
      // Step indicator headers
      d.stepBadgeNum.textContent = this.currentStep;
      d.stepProgressText.textContent = `${this.currentStep} of 3`;
      d.stepProgressBar.style.width = `${(this.currentStep / 3) * 100}%`;

      if (this.currentStep === 1) {
        d.stepTitle.textContent = 'Step 1: Choose Calculation Topic';
        d.step1Container.classList.remove('hidden');
        d.step2Container.classList.add('hidden');
        d.step3Container.classList.add('hidden');
        d.btnWizardBack.classList.add('hidden');
        d.btnWizardNext.classList.remove('hidden');
        d.btnStartSprint.classList.add('hidden');
      } else if (this.currentStep === 2) {
        d.stepTitle.textContent = 'Step 2: Customize Scope & Presets';
        d.step1Container.classList.add('hidden');
        d.step2Container.classList.remove('hidden');
        d.step3Container.classList.add('hidden');
        d.btnWizardBack.classList.remove('hidden');
        d.btnWizardNext.classList.remove('hidden');
        d.btnStartSprint.classList.add('hidden');
        this.updateStep2Panels();
      } else if (this.currentStep === 3) {
        d.stepTitle.textContent = 'Step 3: Select Clock & Constraints';
        d.step1Container.classList.add('hidden');
        d.step2Container.classList.add('hidden');
        d.step3Container.classList.remove('hidden');
        d.btnWizardBack.classList.remove('hidden');
        d.btnWizardNext.classList.add('hidden');
        d.btnStartSprint.classList.remove('hidden');
      }
    }

    updateStep2Panels() {
      const d = this.dom;
      d.scopePanelTables.classList.add('hidden');
      d.scopePanelPowers.classList.add('hidden');
      d.scopePanelFractions.classList.add('hidden');
      d.scopePanelArithmetic.classList.add('hidden');
      d.scopePanelElimination.classList.add('hidden');

      if (this.currentModule === 'tables') {
        d.step2ModuleHeading.textContent = 'Multiplication Tables Scope (1 to 50)';
        d.step2Badge.textContent = 'Tables 1–50';
        d.scopePanelTables.classList.remove('hidden');
      } else if (this.currentModule === 'powers') {
        d.step2ModuleHeading.textContent = 'Squares & Cubes Scope';
        d.step2Badge.textContent = 'x² & x³';
        d.scopePanelPowers.classList.remove('hidden');
      } else if (this.currentModule === 'fractions') {
        d.step2ModuleHeading.textContent = 'Fraction ↔ Percentage Recall Scope';
        d.step2Badge.textContent = 'Fractions ↔ %';
        d.scopePanelFractions.classList.remove('hidden');
      } else if (this.currentModule === 'arithmetic') {
        d.step2ModuleHeading.textContent = 'Mental Arithmetic Operations';
        d.step2Badge.textContent = 'Arithmetic';
        d.scopePanelArithmetic.classList.remove('hidden');
      } else if (this.currentModule === 'elimination') {
        d.step2ModuleHeading.textContent = 'SSC CGL Option Elimination Techniques';
        d.step2Badge.textContent = 'MCQ Shortcuts';
        d.scopePanelElimination.classList.remove('hidden');
      }
    }

    renderTableNumbersGrid() {
      const grid = this.dom.tableNumbersGrid;
      grid.innerHTML = '';
      for (let i = 1; i <= 50; i++) {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = `table-num-btn h-6 text-xs font-mono font-bold rounded flex items-center justify-center transition-colors ${
          this.selectedTables.includes(i) ? 'bg-amber-500 text-white shadow-2xs' : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
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
          btn.className = 'table-num-btn h-6 text-xs font-mono font-bold rounded flex items-center justify-center transition-colors bg-amber-500 text-white shadow-2xs';
        } else {
          btn.className = 'table-num-btn h-6 text-xs font-mono font-bold rounded flex items-center justify-center transition-colors bg-white text-slate-700 hover:bg-slate-100 border border-slate-200';
        }
      });
      this.dom.selectedTablesCount.textContent = this.selectedTables.length;
    }

    // -------------------------------------------------------------
    // FRACTION ↔ PERCENTAGE LAB SUITE
    // -------------------------------------------------------------
    openFractionLabModal() {
      this.renderFractionLabTable('all');
      this.dom.modalFractionLab.classList.remove('hidden');
    }

    renderFractionLabTable(filter = 'all', query = '') {
      const tbody = this.dom.fractionTableBody;
      tbody.innerHTML = '';

      let list = SSC_FRACTIONS;
      if (filter === 'unit') list = list.filter(f => f.category === 'unit');
      else if (filter === 'ssc') list = list.filter(f => f.category === 'ssc');

      if (query && query.trim()) {
        const q = query.trim().toLowerCase();
        list = list.filter(f => f.fraction.includes(q) || f.percent.toLowerCase().includes(q) || f.mixed.toLowerCase().includes(q));
      }

      list.forEach(item => {
        const tr = document.createElement('tr');
        tr.className = 'hover:bg-amber-50/50 transition-colors';
        tr.innerHTML = `
          <td class="py-2.5 px-3 font-bold text-slate-900">${item.fraction}</td>
          <td class="py-2.5 px-3 font-bold text-amber-600">${item.percent}</td>
          <td class="py-2.5 px-3 text-slate-600 font-medium">${item.mixed}</td>
          <td class="py-2.5 px-3 text-right text-slate-600">${item.val}</td>
        `;
        tbody.appendChild(tr);
      });
    }

    filterFractionTable(query) {
      const activeFilterBtn = document.querySelector('.fl-filter-btn.bg-amber-500');
      const filter = activeFilterBtn ? activeFilterBtn.dataset.flFilter : 'all';
      this.renderFractionLabTable(filter, query);
    }

    handleFractionCalcFromFrac() {
      const val = this.dom.calcFractionInput.value.trim();
      if (!val) return;
      const parsed = parseMixedFractionString(val);
      if (!parsed || parsed.den === 0) return;

      let totalNum = parsed.num;
      let totalDen = parsed.den;
      if (parsed.isMixed) {
        totalNum = (parsed.whole * parsed.den) + parsed.num;
      }
      
      const ratio = (totalNum / totalDen) * 100;
      const mixedStr = fractionToMixedString(totalNum, totalDen);
      const dec = totalNum / totalDen;

      this.dom.calcPercentInput.value = mixedStr;
      this.dom.calcResultDisplay.innerHTML = `Equivalent: <span class="font-bold font-mono text-slate-900">${val}</span> = <span class="font-bold text-amber-700 font-mono">${mixedStr}</span> = <span class="font-bold font-mono text-indigo-700">${ratio.toFixed(2)}%</span> <span class="text-slate-600">(Decimal: ${dec.toFixed(4)})</span>`;
    }

    handleFractionCalcFromPercent() {
      const val = this.dom.calcPercentInput.value.trim();
      if (!val) return;

      const parsed = parseMixedFractionString(val);
      if (!parsed) return;

      if (parsed.isMixed) {
        // e.g. 14 2/7% -> 100/7% -> fraction 1/7
        const totalNum = (parsed.whole * parsed.den) + parsed.num;
        const totalDen = parsed.den * 100;
        const simp = simplifyFraction(totalNum, totalDen);
        const dec = (parsed.whole + (parsed.num / parsed.den)) / 100;

        this.dom.calcFractionInput.value = `${simp.num}/${simp.den}`;
        this.dom.calcResultDisplay.innerHTML = `Equivalent: <span class="font-bold font-mono text-amber-700">${parsed.normalized}%</span> = <span class="font-bold font-mono text-slate-900">${simp.num}/${simp.den}</span> <span class="text-slate-600">(Decimal: ${dec.toFixed(4)})</span>`;
      } else {
        // Decimal percentage e.g. 37.5% -> 375/1000 = 3/8
        const p = parsed.value;
        if (p > 0) {
          const dec = p / 100;
          // Precision conversion up to 4 decimal places
          const mult = 10000;
          const simp = simplifyFraction(Math.round(p * 100), 10000);
          const whole = Math.floor(p);
          const rem = Math.round((p - whole) * 100);
          let mixedStr = `${p}%`;
          if (rem > 0) {
            const remSimp = simplifyFraction(rem, 100);
            mixedStr = `${whole} ${remSimp.num}/${remSimp.den}%`;
          }

          this.dom.calcFractionInput.value = `${simp.num}/${simp.den}`;
          this.dom.calcResultDisplay.innerHTML = `Equivalent: <span class="font-bold font-mono text-slate-900">${p}%</span> = <span class="font-bold font-mono text-amber-700">${mixedStr}</span> = <span class="font-bold font-mono text-indigo-700">${simp.num}/${simp.den}</span> <span class="text-slate-600">(Decimal: ${dec.toFixed(4)})</span>`;
        }
      }
    }

    updateErrorBadges() {
      const count = errorBank.getCount();
      this.dom.headerErrorBadge.textContent = count;
      this.dom.setupErrorCount.textContent = count;
      this.dom.setupErrorCountText.textContent = `${count} item${count === 1 ? '' : 's'}`;
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

    // -------------------------------------------------------------
    // ACTIVE DRILL LIFECYCLE
    // -------------------------------------------------------------
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

      this.showView('drill');

      if (this.useNativeKeypad) {
        this.dom.virtualKeypad.classList.add('hidden');
      } else {
        this.dom.virtualKeypad.classList.remove('hidden');
      }

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
              this.dom.timerBar.className = 'h-full bg-amber-500 rounded-full transition-all duration-100 origin-left';
            } else {
              this.dom.timerBar.className = 'h-full bg-indigo-600 rounded-full transition-all duration-100 origin-left';
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

      if (this.animFrameId) cancelAnimationFrame(this.animFrameId);

      if (this.mode === 'classic' && this.totalQuestionsAnswered >= this.classicTarget) {
        this.endSession();
        return;
      }

      this.isProcessingAnswer = false;
      this.currentQuestion = this.generateNextQuestion();
      this.questionStartTime = Date.now();

      this.dom.drillCategoryBadge.textContent = this.currentQuestion.category;
      this.dom.drillQuestionText.textContent = this.currentQuestion.prompt;
      this.dom.drillQuestionSubtext.textContent = this.currentQuestion.subtext || '';

      this.dom.drillFeedbackBanner.style.opacity = '0';
      this.dom.inputBoxWrapper.className = 'relative flex items-center justify-center w-full h-14 sm:h-16 rounded-2xl bg-white border-2 border-slate-300 shadow-sm transition-colors';
      this.dom.mathInput.value = '';

      if (this.currentQuestion.type === 'mcq') {
        this.dom.containerDirectInput.classList.add('hidden');
        this.dom.containerMcqOptions.classList.remove('hidden');
        this.dom.cglShortcutBanner.classList.add('hidden');

        for (let i = 0; i < 4; i++) {
          const optEl = document.getElementById(`optText${i}`);
          if (optEl && this.currentQuestion.options[i] !== undefined) {
            optEl.textContent = this.currentQuestion.options[i];
          }
          const btn = document.querySelector(`[data-option-idx="${i}"]`);
          if (btn) {
            btn.className = 'mcq-option-btn p-3.5 rounded-xl bg-white hover:bg-amber-50/60 border-2 border-slate-200 active:scale-98 text-left transition-all flex items-center justify-between shadow-xs';
          }
        }
      } else {
        this.dom.containerDirectInput.classList.remove('hidden');
        this.dom.containerMcqOptions.classList.add('hidden');

        if (this.currentQuestion.hasFractionKeys) {
          this.dom.fractionHelperRow.classList.remove('hidden');
        } else {
          this.dom.fractionHelperRow.classList.add('hidden');
        }

        this.dom.mathInput.focus();
      }

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

          this.dom.timerBar.style.width = `${ratio * 100}%`;
          this.dom.timerText.textContent = `${(remainingMs / 1000).toFixed(1)}s`;

          if (ratio < 0.25) {
            this.dom.timerBar.className = 'h-full bg-rose-500 rounded-full transition-all duration-75 origin-left';
            this.dom.timerText.className = 'font-mono-numbers text-xs font-bold text-rose-600 w-10 text-right';
          } else if (ratio < 0.5) {
            this.dom.timerBar.className = 'h-full bg-amber-500 rounded-full transition-all duration-75 origin-left';
            this.dom.timerText.className = 'font-mono-numbers text-xs font-bold text-amber-600 w-10 text-right';
          } else {
            this.dom.timerBar.className = 'h-full bg-indigo-600 rounded-full transition-all duration-75 origin-left';
            this.dom.timerText.className = 'font-mono-numbers text-xs font-bold text-slate-800 w-10 text-right';
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

    isAnswerCorrect(userVal) {
      if (!this.currentQuestion || !userVal) return false;
      const cleanVal = userVal.trim().toLowerCase();
      const cleanNoPct = cleanVal.replace(/%/g, '').trim();

      const accepted = (this.currentQuestion.acceptedAnswers || [String(this.currentQuestion.answer)]).map(a => a.trim().toLowerCase());

      // 1. Direct match in accepted list (with or without %)
      if (accepted.includes(cleanVal) || accepted.includes(cleanNoPct)) {
        return true;
      }

      // 2. Tolerance check for fractions to percentages (e.g. 14 2/7, 14.28, 14.29)
      if (typeof this.currentQuestion.targetPercentValue === 'number') {
        const parsed = parseMixedFractionString(cleanVal);
        if (parsed && typeof parsed.value === 'number') {
          if (Math.abs(parsed.value - this.currentQuestion.targetPercentValue) < 0.06) {
            return true;
          }
        }
      }

      // 3. Tolerance check for percentage to fractions (e.g. 1/7, 3/8)
      if (typeof this.currentQuestion.targetFractionRatio === 'number') {
        const parsed = parseMixedFractionString(cleanVal);
        if (parsed && typeof parsed.value === 'number') {
          if (Math.abs(parsed.value - this.currentQuestion.targetFractionRatio) < 0.005) {
            return true;
          }
        }
      }

      return false;
    }

    checkAutoSubmit() {
      const val = this.dom.mathInput.value.trim();
      if (!val || !this.currentQuestion) return;

      if (this.isAnswerCorrect(val)) {
        this.submitDirectAnswer();
      }
    }

    submitDirectAnswer() {
      if (this.isProcessingAnswer || !this.currentQuestion) return;
      const userVal = this.dom.mathInput.value.trim().toLowerCase();
      if (!userVal) return;

      const isCorrect = this.isAnswerCorrect(userVal);
      this.finalizeQuestionAnswer(isCorrect, userVal);
    }

    handleMcqSelect(choiceIndex) {
      if (this.isProcessingAnswer || !this.currentQuestion || this.currentQuestion.type !== 'mcq') return;
      const isCorrect = choiceIndex === this.currentQuestion.correctIndex;
      
      const btn = document.querySelector(`[data-option-idx="${choiceIndex}"]`);
      if (btn) {
        if (isCorrect) {
          btn.classList.add('bg-emerald-50', 'border-emerald-500', 'text-emerald-800');
        } else {
          btn.classList.add('bg-rose-50', 'border-rose-500', 'text-rose-800');
          const correctBtn = document.querySelector(`[data-option-idx="${this.currentQuestion.correctIndex}"]`);
          if (correctBtn) correctBtn.classList.add('bg-emerald-50', 'border-emerald-500', 'text-emerald-800');
        }
      }

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

        errorBank.recordSuccess(this.currentQuestion.prompt);

        this.dom.inputBoxWrapper.className = 'relative flex items-center justify-center w-full h-14 sm:h-16 rounded-2xl bg-emerald-50 border-2 border-emerald-500 shadow-sm transition-colors';
        
        const delay = this.currentQuestion.type === 'mcq' ? 800 : 180;
        setTimeout(() => {
          this.updateSessionStatsHeader();
          this.nextQuestion();
        }, delay);

      } else {
        this.streak = 0;
        sound.wrong();
        sound.vibrate([100]);

        errorBank.recordMistake(this.currentQuestion);
        this.sessionMistakes.push({
          q: this.currentQuestion.prompt,
          ans: this.currentQuestion.answer,
          user: userVal,
          explanation: this.currentQuestion.explanation
        });
        this.updateErrorBadges();

        this.dom.inputBoxWrapper.className = 'relative flex items-center justify-center w-full h-14 sm:h-16 rounded-2xl bg-rose-50 border-2 border-rose-500 shadow-sm animate-shake transition-colors';
        
        this.dom.feedbackText.textContent = userVal === 'TIMEOUT' ? '⏰ Time Out' : '❌ Wrong';
        this.dom.feedbackAnswer.textContent = `Correct: ${this.currentQuestion.answer}`;
        this.dom.drillFeedbackBanner.className = 'absolute -bottom-2 inset-x-2 py-2.5 px-4 rounded-xl border border-rose-300 bg-rose-50 text-rose-800 flex items-center justify-between text-xs font-bold opacity-100 transition-opacity z-20 shadow-md';

        const delay = this.currentQuestion.type === 'mcq' ? 1200 : 850;
        setTimeout(() => {
          this.updateSessionStatsHeader();
          this.nextQuestion();
        }, delay);
      }

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

    handleGlobalKeyDown(e) {
      if (e.key === 'Escape') {
        e.preventDefault();
        if (this.sessionActive) {
          if (this.sessionPaused) this.resumeSession();
          else this.pauseSession();
        }
        return;
      }

      if (this.sessionPaused && e.code === 'Space') {
        e.preventDefault();
        this.resumeSession();
        return;
      }

      if (!this.sessionActive || this.sessionPaused) return;

      if (this.currentQuestion && this.currentQuestion.type === 'mcq') {
        if (['1', '2', '3', '4'].includes(e.key)) {
          e.preventDefault();
          this.handleMcqSelect(parseInt(e.key, 10) - 1);
          return;
        }
      }

      if (e.key === 'Enter') {
        e.preventDefault();
        this.submitDirectAnswer();
        return;
      }

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
          <div class="py-8 text-center text-slate-600">
            <div class="text-3xl mb-2">🎉</div>
            <div class="text-sm font-bold text-slate-800">Clean Slate!</div>
            <div class="text-xs text-slate-600 mt-1">No logged mistakes. Any misses will be queued here for spaced repetition.</div>
          </div>
        `;
        return;
      }

      items.forEach((item) => {
        const div = document.createElement('div');
        div.className = 'p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3';
        div.innerHTML = `
          <div>
            <div class="text-sm font-bold text-slate-900 font-mono-numbers">${item.prompt}</div>
            <div class="text-xs text-emerald-700 font-semibold mt-0.5">${item.explanation || 'Ans: ' + item.answer}</div>
          </div>
          <div class="text-right shrink-0">
            <span class="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-slate-200 text-slate-700">
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

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      window.__mathApp = new MathHubApp();
    });
  } else {
    window.__mathApp = new MathHubApp();
  }
})();
