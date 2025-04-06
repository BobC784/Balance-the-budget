import React, { useState } from 'react';

const policies = [
  { name: "Value-Added Tax (20%)", value: 4.80 },
  { name: "Remove Payroll Tax Cap & Add Surtax", value: 1.75 },
  { name: "2% Wealth Tax > $100M", value: 0.80 },
  { name: "10% Tariff on All Imports", value: 3.20 },
  { name: "Carbon Tax ($60/ton)", value: 1.75 },
  { name: "Defense Budget Optimization", value: 0.85 },
  { name: "Raise Corporate Tax Rate to 35%", value: 1.35 },
  { name: "Raise Top Income Tax Rate to 70%", value: 0.50 },
  { name: "Social Security Modernization Plan", value: 0.60 }
];

const growthStrategies = [
  { name: "Domestic Reinvestment Pressure (Repatriation Tactics)", impact: "+Domestic Capex", description: "Encourages companies to invest and hire in the U.S. through public and political pressure, boosting tax base and job creation." },
  { name: "AI & Automation Tax Credits", impact: "+0.2% GDP Growth", description: "Incentivizes private-sector productivity via automation investments." },
  { name: "Single-Payer Healthcare System", impact: "+Capital Efficiency", description: "Frees up ~$1T/year in employer healthcare costs and reduces admin overhead." },
  { name: "Encourage STEM Degree Studies", impact: "+Workforce Alignment", description: "Prioritizes future-oriented skills in higher education." },
  { name: "High School Generalist Core", impact: "+Early Career Readiness", description: "Shifts core education earlier, freeing college for specialization." },
  { name: "Community Colleges for Trades & Retraining", impact: "+Mid-Career Agility", description: "Expands access to skilled trades and removes stigma around non-degreed pathways." },
  { name: "Integrated 5-Year Professional Degrees", impact: "+Faster Workforce Entry", description: "Streamlines education for careers like medicine and law, reducing student debt and increasing lifetime productivity." }
];

function App() {
  const [selected, setSelected] = useState(() => policies.map((p) => {
    if (p.name.includes("Tariff")) return true;
    if (p.name.includes("Value-Added Tax")) return false;
    return true;
  }));

  const togglePolicy = (index) => {
    const updated = [...selected];
    updated[index] = !updated[index];
    const vatIndex = policies.findIndex(p => p.name.includes("Value-Added Tax"));
    const tariffIndex = policies.findIndex(p => p.name.includes("Tariff"));
    if (updated[index]) {
      if (index === vatIndex) updated[tariffIndex] = false;
      if (index === tariffIndex) updated[vatIndex] = false;
    }
    setSelected(updated);
  };

  const total = policies.reduce((acc, p, i) => selected[i] ? acc + p.value : acc, 0);
  const target = 22;

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Deficit Closure Simulator</h1>
      <p>Toggle policies to simulate their impact on reducing the 10-year federal budget deficit.</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
        {policies.map((p, i) => (
          <div key={i} style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '6px', width: '300px' }}>
            <label>
              <input type="checkbox" checked={selected[i]} onChange={() => togglePolicy(i)} />
              {" "}{p.name}
            </label>
            <div style={{ fontSize: '0.85em', color: '#555' }}>
              Est. Revenue: ${p.value.toFixed(2)}T
            </div>
          </div>
        ))}
      </div>
      <h2 style={{ marginTop: '20px' }}>
        Total Deficit Reduction: ${total.toFixed(2)}T / ${target}T
      </h2>
      <div style={{ fontWeight: 'bold', color: total >= target ? 'green' : 'orange' }}>
        {total >= target ? "✅ Budget fully balanced or surplus achieved" : `⚠️ Shortfall of ${(target - total).toFixed(2)}T remains`}
      </div>

      <div style={{ marginTop: '40px' }}>
        <h2>📈 Grow the Economy – Every American Achieving Their Potential ($2 trillion over 10 years)</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '10px' }}>
          {growthStrategies.map((g, i) => (
            <div key={i} style={{ border: '1px solid #ddd', padding: '10px', borderRadius: '6px', width: '300px' }}>
              <div style={{ fontWeight: 'bold' }}>{g.name}</div>
              <div style={{ fontSize: '0.85em', color: '#444' }}>{g.impact}</div>
              <div style={{ fontSize: '0.8em', marginTop: '5px' }}>{g.description}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
