import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  Activity,
  AlertTriangle,
  BookOpen,
  Calculator,
  Droplet,
  HeartPulse,
  Info,
  Stethoscope,
} from 'lucide-react';
import './styles.css';

const knowledgeData = [
  {
    title: '1. การคัดกรองและการวินิจฉัย (Screening)',
    icon: <Activity className="icon blue" />,
    items: [
      'ไม่ใช้ qSOFA เพียงอย่างเดียวในการคัดกรอง แนะนำให้ใช้ SIRS, NEWS หรือ MEWS ร่วมด้วย',
      'เจาะเลือดตรวจระดับ Lactate ทันทีที่สงสัยภาวะ Sepsis',
    ],
  },
  {
    title: '2. การกู้ชีพเบื้องต้น (Initial Resuscitation)',
    icon: <HeartPulse className="icon red" />,
    items: [
      'ให้ Crystalloid อย่างน้อย 30 mL/kg ทางหลอดเลือดดำภายใน 3 ชั่วโมงแรก',
      'เป้าหมาย MAP เริ่มต้นที่ >= 65 mmHg',
      'ใช้ตัวชี้วัดพลวัต (Dynamic measures) เช่น PLR, SV, PPV หรือ Echo ในการประเมินสารน้ำ',
      'ใช้การลดลงของ Lactate และ Capillary refill time (CRT) เป็นเป้าหมายการตอบสนอง',
    ],
  },
  {
    title: '3. การจัดการการติดเชื้อ (Infection Management)',
    icon: <AlertTriangle className="icon yellow" />,
    items: [
      'Septic Shock หรือ โอกาสเป็น Sepsis สูง: ให้ยาปฏิชีวนะทันที (ภายใน 1 ชั่วโมง)',
      'ไม่มี Shock แต่สงสัย Sepsis: ประเมินด่วน หากยังสงสัยให้ยาภายใน 3 ชั่วโมง',
      'ใช้การประเมินทางคลินิกเป็นหลักในการเริ่มยา (ไม่รอผล Procalcitonin)',
      'ทำ Source control ให้เร็วที่สุด ถอดสายสวนที่สงสัยว่าติดเชื้อออก',
    ],
  },
  {
    title: '4. ระบบไหลเวียนโลหิต (Hemodynamic)',
    icon: <Droplet className="icon teal" />,
    items: [
      'ใช้ Balanced crystalloids เป็นทางเลือกแรก (ห้ามใช้ Starches)',
      'Norepinephrine เป็นยาปลุกความดันตัวแรก (1st line)',
      'หาก MAP ไม่ถึงเป้าหมาย ให้เพิ่ม Vasopressin (เมื่อ NE 0.25-0.5 mcg/kg/min) แทนการเพิ่มขนาดยา NE ต่อ',
      'พิจารณา Dobutamine/Epinephrine หากหัวใจทำงานผิดปกติหรือยังมี Hypoperfusion',
    ],
  },
  {
    title: '5. การจัดการระบบหายใจ (Ventilation)',
    icon: <Stethoscope className="icon purple" />,
    items: [
      'ARDS: ใช้ Low tidal volume (6 mL/kg), Plateau pressure <= 30 cmH2O',
      'Moderate-severe ARDS: ใช้ High PEEP และทำ Prone ventilation (>12 ชม./วัน)',
      'Non-ARDS: แนะนำ High flow nasal oxygen มากกว่า NIV',
    ],
  },
  {
    title: '6. การรักษาเสริม (Additional Therapies)',
    icon: <BookOpen className="icon green" />,
    items: [
      'IV Hydrocortisone 200 mg/day ให้เฉพาะ Septic shock ที่ต้องใช้ Vasopressor ต่อเนื่อง (เช่น NE >=0.25 นาน >4 ชม.)',
      'ควบคุมน้ำตาล: เริ่ม Insulin เมื่อ Glucose >= 180 mg/dL',
      'ให้เลือดเมื่อ Hb < 7 g/dL',
      'ป้องกัน VTE ด้วย LMWH และป้องกัน Stress ulcer เฉพาะผู้ที่มีความเสี่ยง',
    ],
  },
];

function App() {
  const [activeTab, setActiveTab] = useState('knowledge');

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="topbar-inner">
          <div className="brand">
            <Stethoscope className="brand-icon" />
            <h1>Sepsis ZeroNavigator</h1>
          </div>
          <span className="edition">Pro Edition</span>
        </div>
      </header>

      <main className="main-content">
        {activeTab === 'knowledge' && <KnowledgeCenter />}
        {activeTab === 'news' && <NEWSCalculator />}
        {activeTab === 'qsofa' && <QSOFACalculator />}
        {activeTab === 'drugs' && <DrugCalculator />}
      </main>

      <nav className="bottom-nav" aria-label="Primary navigation">
        <div className="bottom-nav-inner">
          <NavButton active={activeTab === 'knowledge'} onClick={() => setActiveTab('knowledge')} icon={<BookOpen />} label="Guideline" />
          <NavButton active={activeTab === 'news'} onClick={() => setActiveTab('news')} icon={<Activity />} label="NEWS" />
          <NavButton active={activeTab === 'qsofa'} onClick={() => setActiveTab('qsofa')} icon={<AlertTriangle />} label="qSOFA" />
          <NavButton active={activeTab === 'drugs'} onClick={() => setActiveTab('drugs')} icon={<Calculator />} label="Rx Calc" />
        </div>
      </nav>
    </div>
  );
}

function NavButton({ active, onClick, icon, label }) {
  return (
    <button type="button" onClick={onClick} className={`nav-button ${active ? 'active' : ''}`} aria-current={active ? 'page' : undefined}>
      {React.cloneElement(icon, { className: 'nav-icon' })}
      <span>{label}</span>
    </button>
  );
}

function KnowledgeCenter() {
  return (
    <div className="screen fade-in">
      <section className="intro-panel">
        <h2>SSC 2021 Guidelines Summary</h2>
        <p>สรุปแนวทางเวชปฏิบัติสำหรับการดูแลผู้ป่วย Sepsis และ Septic Shock</p>
      </section>

      <section className="knowledge-grid" aria-label="Guideline summary">
        {knowledgeData.map((section) => (
          <article key={section.title} className="content-card">
            <div className="card-heading">
              {section.icon}
              <h3>{section.title}</h3>
            </div>
            <ul>
              {section.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        ))}
      </section>
    </div>
  );
}

function QSOFACalculator() {
  const [qsofa, setQsofa] = useState({ resp: false, ment: false, sbp: false });
  const score = Number(qsofa.resp) + Number(qsofa.ment) + Number(qsofa.sbp);
  const risk = score >= 2
    ? { text: 'High Risk (ความเสี่ยงสูง)', color: 'danger', tone: 'danger-panel' }
    : { text: 'Low Risk (ความเสี่ยงต่ำ)', color: 'success', tone: 'success-panel' };

  const update = (key, checked) => setQsofa((current) => ({ ...current, [key]: checked }));

  return (
    <div className="screen narrow fade-in">
      <section className="content-card form-card">
        <h2>qSOFA Calculator</h2>
        <p className="muted">Quick Sequential Organ Failure Assessment (ไม่แนะนำให้ใช้เป็นเครื่องมือคัดกรองเดี่ยวๆ ตาม SSC 2021 แต่ใช้ประเมิน poor outcome ได้)</p>
        <div className="check-list">
          <CheckOption title="Respiratory Rate >= 22 /min" subtitle="อัตราการหายใจ >= 22 ครั้ง/นาที" checked={qsofa.resp} onChange={(checked) => update('resp', checked)} />
          <CheckOption title="Altered Mental Status" subtitle="ระดับความรู้สึกตัวเปลี่ยนแปลง (GCS < 15)" checked={qsofa.ment} onChange={(checked) => update('ment', checked)} />
          <CheckOption title="Systolic BP <= 100 mmHg" subtitle="ความดันโลหิตตัวบน <= 100 mmHg" checked={qsofa.sbp} onChange={(checked) => update('sbp', checked)} />
        </div>
      </section>

      <section className={`result-panel ${risk.tone}`}>
        <span>Total Score</span>
        <strong className={risk.color}>{score}</strong>
        <b className={risk.color}>{risk.text}</b>
        {score >= 2 && (
          <p>ผู้ป่วยมีความเสี่ยงสูงต่อการเสียชีวิต หรือต้องนอน ICU นาน ควรประเมินหาภาวะ Sepsis และพิจารณาให้การรักษาทันที</p>
        )}
      </section>
    </div>
  );
}

function CheckOption({ title, subtitle, checked, onChange }) {
  return (
    <label className="check-option">
      <span>
        <strong>{title}</strong>
        <small>{subtitle}</small>
      </span>
      <input type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} />
    </label>
  );
}

function NEWSCalculator() {
  const [params, setParams] = useState({ rr: 0, spo2: 0, o2: 0, sbp: 0, hr: 0, avpu: 0, temp: 0 });
  const score = Object.values(params).reduce((total, item) => total + item, 0);

  const getRisk = () => {
    const hasExtreme = Object.values(params).some((val) => val === 3);
    if (score >= 7) return { level: 'High', color: 'danger', tone: 'danger-soft', action: 'ตอบสนองฉุกเฉินระดับสูงสุด ประเมินโดยทีมแพทย์ทันที (Continuous monitoring)' };
    if (score >= 5 || hasExtreme) return { level: 'Medium', color: 'warning', tone: 'warning-soft', action: 'ประเมินโดยแพทย์อย่างเร่งด่วน เฝ้าระวังทุก 1 ชั่วโมง' };
    if (score >= 1) return { level: 'Low', color: 'caution', tone: 'caution-soft', action: 'ประเมินซ้ำทุก 4-6 ชั่วโมง' };
    return { level: 'Normal', color: 'success', tone: 'success-soft', action: 'เฝ้าระวังตามปกติ (ทุก 12 ชั่วโมง)' };
  };

  const risk = getRisk();
  const setScore = (name, value) => setParams((current) => ({ ...current, [name]: value }));

  return (
    <div className="screen fade-in">
      <section className="content-card form-card">
        <div className="score-heading">
          <div>
            <h2>NEWS Calculator</h2>
            <p className="muted">National Early Warning Score</p>
          </div>
          <div className={`score-badge ${risk.tone}`}>
            <strong className={risk.color}>{score}</strong>
          </div>
        </div>

        {score > 0 && (
          <div className={`risk-banner ${risk.tone}`}>
            {risk.level} Risk: {risk.action}
          </div>
        )}

        <div className="select-grid">
          <SelectGroup label="Respiratory Rate (ครั้ง/นาที)" name="rr" value={params.rr} onSelect={setScore} options={[
            { label: '<=8', val: 3 }, { label: '9-11', val: 1 }, { label: '12-20', val: 0 }, { label: '21-24', val: 2 }, { label: '>=25', val: 3 },
          ]} />
          <SelectGroup label="SpO2 (%) - Scale 1" name="spo2" value={params.spo2} onSelect={setScore} options={[
            { label: '<=91', val: 3 }, { label: '92-93', val: 2 }, { label: '94-95', val: 1 }, { label: '>=96', val: 0 },
          ]} />
          <SelectGroup label="Air / Oxygen" name="o2" value={params.o2} onSelect={setScore} options={[
            { label: 'Room Air', val: 0 }, { label: 'Oxygen', val: 2 },
          ]} />
          <SelectGroup label="Systolic BP (mmHg)" name="sbp" value={params.sbp} onSelect={setScore} options={[
            { label: '<=90', val: 3 }, { label: '91-100', val: 2 }, { label: '101-110', val: 1 }, { label: '111-219', val: 0 }, { label: '>=220', val: 3 },
          ]} />
          <SelectGroup label="Heart Rate (ครั้ง/นาที)" name="hr" value={params.hr} onSelect={setScore} options={[
            { label: '<=40', val: 3 }, { label: '41-50', val: 1 }, { label: '51-90', val: 0 }, { label: '91-110', val: 1 }, { label: '111-130', val: 2 }, { label: '>=131', val: 3 },
          ]} />
          <SelectGroup label="Consciousness" name="avpu" value={params.avpu} onSelect={setScore} options={[
            { label: 'Alert (A)', val: 0 }, { label: 'CVPU (สับสน/ซึม)', val: 3 },
          ]} />
          <SelectGroup label="Temperature (deg C)" name="temp" value={params.temp} onSelect={setScore} options={[
            { label: '<=35.0', val: 3 }, { label: '35.1-36.0', val: 1 }, { label: '36.1-38.0', val: 0 }, { label: '38.1-39.0', val: 1 }, { label: '>=39.1', val: 2 },
          ]} />
        </div>
      </section>
    </div>
  );
}

function SelectGroup({ label, name, options, value, onSelect }) {
  return (
    <fieldset className="select-group">
      <legend>{label}</legend>
      <div>
        {options.map((opt) => (
          <button key={`${name}-${opt.label}`} type="button" onClick={() => onSelect(name, opt.val)} className={value === opt.val ? 'selected' : ''}>
            {opt.label} <small>({opt.val})</small>
          </button>
        ))}
      </div>
    </fieldset>
  );
}

function DrugCalculator() {
  const [drug, setDrug] = useState('NE');
  const [mode, setMode] = useState('dose_to_rate');
  const [weight, setWeight] = useState(50);
  const [mg, setMg] = useState(4);
  const [vol, setVol] = useState(250);
  const [dose, setDose] = useState(0.05);
  const [rate, setRate] = useState(5);

  useEffect(() => {
    if (drug === 'NE') {
      setMg(4);
      setVol(250);
      setDose(0.05);
      setRate(3.75);
    } else {
      setMg(250);
      setVol(250);
      setDose(5);
      setRate(15);
    }
  }, [drug]);

  const concentration = vol > 0 ? (mg * 1000) / vol : 0;
  const calculatedRate = weight > 0 && concentration > 0 ? (dose * weight * 60) / concentration : 0;
  const calculatedDose = weight > 0 ? (rate * concentration) / (weight * 60) : 0;

  return (
    <div className="screen narrow fade-in">
      <div className="segmented-control">
        <button type="button" onClick={() => setDrug('NE')} className={drug === 'NE' ? 'active' : ''}>Norepinephrine (NE)</button>
        <button type="button" onClick={() => setDrug('DOB')} className={drug === 'DOB' ? 'active' : ''}>Dobutamine</button>
      </div>

      <section className="content-card form-card">
        <div className={`info-box ${drug === 'NE' ? 'blue-soft' : 'purple-soft'}`}>
          <Info className="info-icon" />
          <p>
            <strong>{drug === 'NE' ? 'Norepinephrine:' : 'Dobutamine:'}</strong>{' '}
            {drug === 'NE'
              ? 'ยา Vasopressor ทางเลือกแรกใน Septic shock Starting dose ปกติ: 0.01 - 0.05 mcg/kg/min'
              : 'พิจารณาใช้เมื่อหัวใจบีบตัวลดลง หรือมี Hypoperfusion แม้ได้สารน้ำพอ Starting dose ปกติ: 2 - 5 mcg/kg/min'}
          </p>
        </div>

        <div className="input-grid">
          <NumberField label="น้ำหนักผู้ป่วย (Weight)" unit="kg" value={weight} onChange={setWeight} />
          <span />
          <NumberField label="ขนาดยาผสม (Amount)" unit="mg" value={mg} onChange={setMg} />
          <NumberField label="ปริมาตรสารน้ำ (Volume)" unit="ml" value={vol} onChange={setVol} />
        </div>

        <div className="concentration">
          ความเข้มข้น (Concentration): <strong>{concentration.toFixed(1)} mcg/ml</strong>
        </div>

        <div className="segmented-control small">
          <button type="button" onClick={() => setMode('dose_to_rate')} className={mode === 'dose_to_rate' ? 'active' : ''}>คำนวณ Rate (ml/hr)</button>
          <button type="button" onClick={() => setMode('rate_to_dose')} className={mode === 'rate_to_dose' ? 'active' : ''}>คำนวณ Dose (mcg/kg/min)</button>
        </div>

        {mode === 'dose_to_rate' ? (
          <CalcResult
            label="ต้องการ Dose ยา"
            unit="mcg/kg/min"
            value={dose}
            step="0.01"
            onChange={setDose}
            resultLabel="ตั้ง Infusion Pump ที่ (Rate)"
            resultValue={calculatedRate.toFixed(1)}
            resultUnit="ml/hr"
            accent="green"
          />
        ) : (
          <CalcResult
            label="Rate ที่หยดยาอยู่"
            unit="ml/hr"
            value={rate}
            step="0.1"
            onChange={setRate}
            resultLabel="ผู้ป่วยได้รับ Dose ยา"
            resultValue={calculatedDose.toFixed(3)}
            resultUnit="mcg/kg/min"
            accent="amber"
          />
        )}
      </section>
    </div>
  );
}

function NumberField({ label, unit, value, onChange, step = '1' }) {
  return (
    <label className="number-field">
      <span>{label}</span>
      <input type="number" step={step} value={value} onChange={(event) => onChange(Number(event.target.value))} />
      <b>{unit}</b>
    </label>
  );
}

function CalcResult({ label, unit, value, step, onChange, resultLabel, resultValue, resultUnit, accent }) {
  return (
    <div className="calc-block">
      <NumberField label={label} unit={unit} value={value} step={step} onChange={onChange} />
      <div className="calc-result">
        <span>{resultLabel}</span>
        <strong className={accent}>{resultValue} <small>{resultUnit}</small></strong>
      </div>
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
