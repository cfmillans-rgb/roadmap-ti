import React, { useState } from 'react';
import './index.css';
import roadmapData from './data/roadmap.json';

const Badge = ({ text, type = 'default' }) => {
  const isHigh = type === 'high-impact' || text === 'Alto';
  const isMed = text === 'Medio';
  let badgeClass = 'badge';
  if (isHigh) badgeClass += ' high-impact';
  if (isMed) badgeClass += ' med-impact';
  return (
    <span className={badgeClass}>
      {text}
    </span>
  );
};

const CourseCard = ({ course }) => {
  return (
    <div className={`card ${course.status === 'done' ? 'card-done' : ''}`} tabIndex="0" aria-label={`Curso: ${course.name}`}>
      {course.buffer && <div className="buffer-tag">⏸ {course.buffer}</div>}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <span style={{ fontSize: '24px', opacity: course.status === 'done' ? 0.5 : 1 }}>{course.num || '📚'}</span>
        <div style={{ flex: 1 }}>
          <h3 style={{ fontSize: '18px', color: course.status === 'done' ? 'var(--muted)' : 'var(--text)', marginBottom: '8px', textDecoration: course.status === 'done' ? 'line-through' : 'none' }}>
            {course.name}
          </h3>
          <p style={{ fontSize: '13px', color: 'var(--muted)', marginBottom: '12px' }}>
            {course.vendor} {course.hours ? `• ${course.hours}` : ''} • {course.date}
          </p>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {course.impact && <Badge text={course.impact} type={course.impact === 'Alto' ? 'high-impact' : 'default'} />}
            {course.badge && <Badge text={course.badge} />}
            {course.module && <Badge text={`Módulo: ${course.module}`} />}
          </div>
        </div>
      </div>
    </div>
  );
};

const AccordionGroup = ({ group }) => {
  const [isOpen, setIsOpen] = useState(group.open);
  
  return (
    <details className="accordion" open={isOpen} onToggle={(e) => setIsOpen(e.target.open)}>
      <summary className="accordion-summary">
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span className="accordion-badge">{group.title}</span>
          <span className="accordion-desc">{group.desc}</span>
        </div>
        <span className="chevron" style={{ transform: isOpen ? 'rotate(90deg)' : 'rotate(0)' }}>▶</span>
      </summary>
      <div className="accordion-body">
        {group.courses.map(course => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </details>
  );
};

const MegaSection = ({ section }) => {
  if (!section) return null;
  return (
    <section style={{ marginBottom: '48px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px', paddingBottom: '16px', borderBottom: '1px solid var(--border)' }}>
        <span style={{ fontSize: '32px' }}>{section.icon}</span>
        <div>
          <h2 className="serif-title" style={{ fontSize: '28px', color: 'var(--champagne)' }}>{section.title}</h2>
          <p style={{ fontSize: '14px', color: 'var(--muted)' }}>{section.subtitle} &bull; {section.count}</p>
        </div>
      </div>
      
      {section.note && (
        <div className="info-box">
          {section.note}
        </div>
      )}
      
      {section.warning && (
        <div className="info-box warning">
          {section.warning}
        </div>
      )}

      <div style={{ marginTop: '24px' }}>
        {section.groups && section.groups.map(group => (
          <AccordionGroup key={group.id} group={group} />
        ))}
      </div>
    </section>
  );
};

const VoucherAlert = ({ data }) => {
  return (
    <div className="voucher-alert">
      <h2 className="serif-title" style={{ fontSize: '20px', color: 'var(--text)', marginBottom: '8px' }}>
        CompTIA Voucher
      </h2>
      <div className="code">{data.code}</div>
      <p style={{ fontSize: '14px', color: 'var(--text)', marginBottom: '12px' }}>
        <strong>Descuento:</strong> {data.discount} en {data.exam}
      </p>
      <div style={{ padding: '12px', background: 'rgba(255, 191, 0, 0.1)', borderRadius: '8px', borderLeft: '3px solid var(--amber)', fontSize: '13px', color: 'var(--muted)' }}>
        {data.note}
      </div>
    </div>
  );
};

const FocusGrid = ({ data }) => {
  return (
    <section style={{ marginBottom: '48px' }}>
      <div style={{ marginBottom: '24px' }}>
        <h2 className="serif-title" style={{ fontSize: '28px', color: 'var(--copper)', marginBottom: '4px' }}>{data.title}</h2>
        <p style={{ fontSize: '14px', color: 'var(--muted)' }}>{data.subtitle}</p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
        {data.items.map((item, idx) => (
          <div key={idx} className="card" style={{ gridColumn: item.fullWidth ? '1 / -1' : 'auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span style={{ fontSize: '20px' }}>{item.icon}</span>
              <h3 style={{ fontSize: '16px', color: 'var(--text)' }}>{item.name}</h3>
            </div>
            <p style={{ fontSize: '13px', color: 'var(--muted)', lineHeight: '1.6' }}>{item.desc}</p>
            {item.badges && (
              <div style={{ display: 'flex', gap: '8px', marginTop: '12px', flexWrap: 'wrap' }}>
                {item.badges.map((b, i) => <Badge key={i} text={b} />)}
              </div>
            )}
          </div>
        ))}
      </div>
      {data.note && (
        <div className="info-box" style={{ marginTop: '16px' }}>
          {data.note}
        </div>
      )}
    </section>
  );
};

const CurrentCourse = ({ data }) => {
  return (
    <div className="current-course">
      <div className="pulse-dot"></div>
      <div style={{ fontSize: '12px', color: 'var(--copper)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px', fontWeight: 'bold' }}>
        {data.title}
      </div>
      <h2 className="serif-title" style={{ fontSize: '32px', color: 'var(--text)', marginBottom: '16px' }}>
        {data.name}
      </h2>
      <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', marginBottom: '24px' }}>
        <div>
          <div style={{ fontSize: '11px', color: 'var(--muted)', textTransform: 'uppercase' }}>Módulo</div>
          <div style={{ fontSize: '16px', color: 'var(--copper)', fontWeight: 'bold' }}>{data.module}</div>
        </div>
        <div>
          <div style={{ fontSize: '11px', color: 'var(--muted)', textTransform: 'uppercase' }}>Horas</div>
          <div style={{ fontSize: '16px', color: 'var(--copper)', fontWeight: 'bold' }}>{data.hours}</div>
        </div>
        <div>
          <div style={{ fontSize: '11px', color: 'var(--muted)', textTransform: 'uppercase' }}>Cierre</div>
          <div style={{ fontSize: '16px', color: 'var(--copper)', fontWeight: 'bold' }}>{data.deadline}</div>
        </div>
      </div>
      <div style={{ width: '100%', height: '8px', background: 'var(--surface2)', borderRadius: '4px', overflow: 'hidden', marginBottom: '8px' }}>
        <div style={{ width: `${data.progress}%`, height: '100%', background: 'linear-gradient(90deg, var(--rose-gold), var(--copper))' }}></div>
      </div>
      <div style={{ fontSize: '12px', color: 'var(--muted)' }}>{data.progressText}</div>
    </div>
  );
};

const Sidebar = ({ stats }) => (
  <nav className="sidebar">
    <div>
      <h1 className="serif-title" style={{ fontSize: '24px', color: 'var(--copper)', marginBottom: '4px' }}>
        Camila Millán
      </h1>
      <p style={{ fontSize: '13px', color: 'var(--muted)' }}>IT Professional Roadmap</p>
    </div>
    
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '32px' }}>
      <div style={{ background: 'var(--surface2)', padding: '16px', borderRadius: '12px' }}>
        <div style={{ fontSize: '12px', color: 'var(--muted)', textTransform: 'uppercase' }}>Progreso</div>
        <div style={{ fontSize: '28px', color: 'var(--text)', fontFamily: 'DM Serif Display' }}>{stats.progress}%</div>
        <div style={{ width: '100%', height: '6px', background: 'var(--surface)', borderRadius: '4px', marginTop: '8px', overflow: 'hidden' }}>
          <div style={{ width: `${stats.progress}%`, height: '100%', background: 'var(--copper)' }}></div>
        </div>
      </div>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 16px', borderBottom: '1px solid var(--border)' }}>
        <span style={{ color: 'var(--muted)' }}>Cursos</span>
        <span style={{ color: 'var(--text)', fontWeight: '600' }}>{stats.completed} / {stats.total}</span>
      </div>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 16px', borderBottom: '1px solid var(--border)' }}>
        <span style={{ color: 'var(--muted)' }}>Horas</span>
        <span style={{ color: 'var(--text)', fontWeight: '600' }}>{stats.hours}</span>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 16px', borderBottom: '1px solid var(--border)' }}>
        <span style={{ color: 'var(--muted)' }}>Deadline</span>
        <span style={{ color: 'var(--text)', fontWeight: '600' }}>{stats.deadline}</span>
      </div>
    </div>
    
    <div style={{ marginTop: 'auto', fontSize: '12px', color: 'var(--muted)' }}>
      Actualizado: {stats.updatedAt}
    </div>
  </nav>
);

function App() {
  const { stats, comptiaVoucher, focus2026, dailySystem, digitalizaLab, currentCourse, googleScholarship, ipssAcademy } = roadmapData;

  return (
    <div className="app-container">
      {/* Background Orbs */}
      <div className="orb orb-1"></div>
      <div className="orb orb-2"></div>
      
      <Sidebar stats={stats} />
      
      <main className="main-content">
        <header style={{ marginBottom: '48px' }}>
          <h1 className="serif-title" style={{ fontSize: '42px', color: 'var(--text)' }}>
            Estrategia de Carrera 2026-2027
          </h1>
          <p style={{ fontSize: '16px', color: 'var(--muted)', marginTop: '8px', maxWidth: '600px' }}>
            Plan enfocado en certificaciones técnicas de alto impacto, ciberseguridad y laboratorios prácticos.
          </p>
        </header>

        <VoucherAlert data={comptiaVoucher} />

        <CurrentCourse data={currentCourse} />
        
        <FocusGrid data={focus2026} />
        <FocusGrid data={dailySystem} />
        <FocusGrid data={digitalizaLab} />

        <MegaSection section={googleScholarship} />
        <MegaSection section={ipssAcademy} />
      </main>
    </div>
  );
}

export default App;
