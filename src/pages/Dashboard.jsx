import { useState, useEffect } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { Database, Beaker, FileCheck, Activity } from 'lucide-react'
import './Dashboard.css'

function Dashboard() {
  const [stats, setStats] = useState({
    totalFeatures: 0,
    totalCandidates: 0,
    totalCompounds: 0,
    externalSources: 0
  })
  
  const abundanceData = [
    { sample: 'Amostra 1', abundance: 45000 },
    { sample: 'Amostra 2', abundance: 38000 },
    { sample: 'Amostra 3', abundance: 52000 },
    { sample: 'Amostra 4', abundance: 41000 },
    { sample: 'Amostra 5', abundance: 48000 },
  ]
  
  const sourceDistribution = [
    { name: 'PubChem', value: 450, color: '#04BDA2' },
    { name: 'ChEBI', value: 320, color: '#016FE1' },
    { name: 'ChemSpider', value: 180, color: '#bd0404' },
  ]
  
  useEffect(() => {
    setTimeout(() => {
      setStats({
        totalFeatures: 1248,
        totalCandidates: 6240,
        totalCompounds: 950,
        externalSources: 3
      })
    }, 500)
  }, [])
  
  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1 className="dashboard-title">Dashboard Analítico</h1>
        <p className="dashboard-subtitle">Visão geral dos dados integrados do QuimioAnalytics</p>
      </header>
      
      {/* Cards de Estatísticas */}
      <div className="stats-grid">
        <div className="stat-card border-verde">
          <div className="stat-content">
            <div className="stat-text">
              <p className="stat-label">Total de Features</p>
              <p className="stat-value text-verde">{stats.totalFeatures}</p>
            </div>
            <Database className="stat-icon text-verde" size={40} />
          </div>
        </div>
        
        <div className="stat-card border-azul">
          <div className="stat-content">
            <div className="stat-text">
              <p className="stat-label">Candidatos</p>
              <p className="stat-value text-azul">{stats.totalCandidates}</p>
            </div>
            <Beaker className="stat-icon text-azul" size={40} />
          </div>
        </div>
        
        <div className="stat-card border-verde-medium">
          <div className="stat-content">
            <div className="stat-text">
              <p className="stat-label">Compostos Ref.</p>
              <p className="stat-value text-verde-medium">{stats.totalCompounds}</p>
            </div>
            <FileCheck className="stat-icon text-verde-medium" size={40} />
          </div>
        </div>
        
        <div className="stat-card border-azul-light">
          <div className="stat-content">
            <div className="stat-text">
              <p className="stat-label">Fontes Externas</p>
              <p className="stat-value text-azul-light">{stats.externalSources}</p>
            </div>
            <Activity className="stat-icon text-azul-light" size={40} />
          </div>
        </div>
      </div>
      
    {/* Seção de Gráficos Lado a Lado */}
      <div className="charts-grid">
        
        {/* Gráfico de Abundância */}
        <div className="chart-card">
          <h2 className="chart-title">Abundância por Amostra</h2>
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={abundanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#424242" vertical={false} />
                <XAxis dataKey="sample" stroke="#737373" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#737373" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }} 
                  contentStyle={{ 
                    backgroundColor: '#111111', 
                    border: '1px solid #424242',
                    borderRadius: '8px',
                    color: '#fff'
                  }}
                  itemStyle={{ color: '#04BDA2' }}
                />
                <Bar dataKey="abundance" fill="#04BDA2" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Gráfico de Distribuição de Fontes */}
        <div className="chart-card">
          <h2 className="chart-title">Distribuição por Fonte</h2>
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={sourceDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                  label={{ fill: '#ffffff', fontSize: 12 }}
                >
                  {sourceDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#111111', 
                    border: '1px solid #424242',
                    borderRadius: '8px',
                    color: '#fff'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div> 
      
      {/* Tabela */}
      <div className="table-card">
        <h2 className="chart-title">Últimas Atualizações</h2>
        <div className="table-responsive">
          <table className="dashboard-table">
            <thead>
              <tr>
                <th>Batch</th>
                <th>Tipo</th>
                <th>Data</th>
                <th>Registros</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="font-medium">TOP5_RANKING_MERGE</td>
                <td><span className="badge badge-verde">Ranking</span></td>
                <td className="text-muted">2026-05-05 14:32</td>
                <td>6,240</td>
                <td><span className="badge badge-azul">Completo</span></td>
              </tr>
              <tr>
                <td className="font-medium">PUBCHEM_IMPORT_2026</td>
                <td><span className="badge badge-azul">Externa</span></td>
                <td className="text-muted">2026-05-05 14:15</td>
                <td>450</td>
                <td><span className="badge badge-azul">Completo</span></td>
              </tr>
              <tr>
                <td className="font-medium">MERGE_RESULTADO_20260505</td>
                <td><span className="badge badge-vermelho">Interna</span></td>
                <td className="text-muted">2026-05-05 13:45</td>
                <td>1,248</td>
                <td><span className="badge badge-azul">Completo</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Dashboard