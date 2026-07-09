import React from 'react';
import './index.css';
import roadmapData from './data/roadmap.json';

const Badge = ({ text, type = 'default' }) => {
  const isHigh = type === 'high-impact' || text === 'Alto';
  return (
    <span className={`badge ${isHigh ? 'high-impact' : ''}`}>
      {text}
    </span>
  );
};

const CourseCard = ({ course }) => {
  return (
    <div className="card" tabIndex="0" aria-label={`Curso: ${course.name}`}>
      <div>
        <h3 style={{ fontSize: '18px', color: 'var(--text)', marginBottom: '8px' }}>
          {course.name}
        </h3>
        <p style={{ fontSize: '13px', color: 'var(--muted)', marginBottom: '12px' }}>
          {course.vendor} &bull; {course.hours || 'N/A'} &bull; {course.date}
        </p>
      </div>
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        {course.impact && <Badge text={course.impact} type="high-impact" />}
        {course.badge && <Badge text={course.badge} />}
        {course.module && <Badge text={`Módulo: ${course.module}`} />}
        <Badge text={course.status === 'done' ? 'Completado' : course.status === 'in-progress' ? 'En Curso' : 'Pendiente'} />
      </div>
    </div>
  );
};

const MegaSection = ({ section }) => {
  return (
    <section style={{ marginBottom: '48px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px', paddingBottom: '16px', borderBottom: '1px solid var(--border)' }}>
        <span style={{ fontSize: '32px' }}>{section.icon}</span>
        <div>
          <h2 className="serif-title" style={{ fontSize: '28px', color: 'var(--champagne)' }}>{section.title}</h2>
          <p style={{ fontSize: '14px', color: 'var(--muted)' }}>{section.subtitle} &bull; {section.count}</p>
        </div>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
        {section.courses.map(course => (
          <CourseCard key={course.id} course={course} />
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
    </div>
    
    <div style={{ marginTop: 'auto', fontSize: '12px', color: 'var(--muted)' }}>
      Actualizado: {stats.updatedAt}
    </div>
  </nav>
);

function App() {
  const { stats, comptiaVoucher, megaSections } = roadmapData;

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

        {megaSections.map(section => (
          <MegaSection key={section.id} section={section} />
        ))}
      </main>
    </div>
  );
}

export default App;
