import { useState, useEffect } from 'react'
import { Search, Download, Filter, TrendingUp, AlertCircle } from 'lucide-react'
import './Top5Ranking.css'

function Top5Ranking() {
  const [searchTerm, setSearchTerm] = useState('')
  const [rankingData, setRankingData] = useState([])
  const [selectedFeature, setSelectedFeature] = useState(null)
  
    // Dados de exemplo (Mock)
   useEffect(() => {
    const mockData = [
      {
        feature_id: 'F_001',
        mz: 180.0634,
        rt: 5.43,
        candidates: [
          { rank: 1, name: 'Glucose', probability: 0.89, mass_error_ppm: 2.1, formula: 'C6H12O6', source: 'PubChem' },
          { rank: 2, name: 'Fructose', probability: 0.78, mass_error_ppm: 3.5, formula: 'C6H12O6', source: 'ChEBI' },
          { rank: 3, name: 'Mannose', probability: 0.65, mass_error_ppm: 4.2, formula: 'C6H12O6', source: 'PubChem' },
          { rank: 4, name: 'Galactose', probability: 0.52, mass_error_ppm: 5.1, formula: 'C6H12O6', source: 'ChEBI' },
          { rank: 5, name: 'Allose', probability: 0.41, mass_error_ppm: 6.3, formula: 'C6H12O6', source: 'ChemSpider' },
        ]
      },
      {
        feature_id: 'F_002',
        mz: 194.0790,
        rt: 7.21,
        candidates: [
          { rank: 1, name: 'Caffeine', probability: 0.92, mass_error_ppm: 1.8, formula: 'C8H10N4O2', source: 'PubChem' },
          { rank: 2, name: 'Theobromine', probability: 0.71, mass_error_ppm: 3.2, formula: 'C7H8N4O2', source: 'ChEBI' },
          { rank: 3, name: 'Theophylline', probability: 0.68, mass_error_ppm: 3.9, formula: 'C7H8N4O2', source: 'PubChem' },
          { rank: 4, name: 'Paraxanthine', probability: 0.55, mass_error_ppm: 4.7, formula: 'C7H8N4O2', source: 'ChEBI' },
          { rank: 5, name: '1-Methylxanthine', probability: 0.38, mass_error_ppm: 6.8, formula: 'C6H6N4O2', source: 'ChemSpider' },
        ]
      },
      {
        feature_id: 'F_003',
        mz: 342.1162,
        rt: 12.87,
        candidates: [
          { rank: 1, name: 'Sucrose', probability: 0.85, mass_error_ppm: 2.4, formula: 'C12H22O11', source: 'PubChem' },
          { rank: 2, name: 'Lactose', probability: 0.73, mass_error_ppm: 3.6, formula: 'C12H22O11', source: 'ChEBI' },
          { rank: 3, name: 'Maltose', probability: 0.67, mass_error_ppm: 4.3, formula: 'C12H22O11', source: 'PubChem' },
          { rank: 4, name: 'Trehalose', probability: 0.59, mass_error_ppm: 5.2, formula: 'C12H22O11', source: 'ChEBI' },
          { rank: 5, name: 'Cellobiose', probability: 0.44, mass_error_ppm: 6.5, formula: 'C12H22O11', source: 'ChemSpider' },
        ]
      },
    ]
    setRankingData(mockData)
  }, [])

  // ESTA É A VARIÁVEL QUE ESTAVA FALTANDO:
  const filteredData = rankingData.filter(feature =>
    feature.feature_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    feature.candidates.some(c => c.name.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  const getProbClass = (prob) => {
    if (prob >= 0.8) return 'prob-high'
    if (prob >= 0.6) return 'prob-medium'
    return 'prob-low'
  }

  return (
    <div className="ranking-container">
      <header className="ranking-header">
        <div className="header-text">
          <h1 className="page-title">Top 5 Ranking</h1>
          <p className="page-subtitle">Candidatos ranqueados por probabilidade analítica</p>
        </div>
        <button className="btn btn-primary">
          <Download size={18} />
          <span>Exportar Parquet</span>
        </button>
      </header>
      
      <section className="filter-section">
        <div className="search-wrapper">
          <Search className="search-icon" size={20} />
          <input
            type="text"
            placeholder="Buscar por Feature ID ou nome..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field"
          />
        </div>
        <button className="btn btn-secondary">
          <Filter size={18} />
          <span>Filtros</span>
        </button>
      </section>
      
      <div className="features-list">
        {filteredData.map((feature) => (
          <article key={feature.feature_id} className="feature-card">
            <div className="feature-card-header">
              <div className="feature-meta">
                <div className="feature-id-badge">{feature.feature_id}</div>
                <div className="feature-specs">
                  <p className="spec-mz">m/z: <span>{feature.mz.toFixed(4)}</span></p>
                  <p className="spec-rt">RT: {feature.rt.toFixed(2)} min</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedFeature(selectedFeature === feature.feature_id ? null : feature.feature_id)}
                className="btn btn-ghost"
              >
                {selectedFeature === feature.feature_id ? 'Ocultar' : 'Ver Detalhes'}
              </button>
            </div>
            
            <div className="table-container">
              <table className="ranking-table">
                <thead>
                  <tr>
                    <th>Rank</th>
                    <th>Composto</th>
                    <th>Fórmula</th>
                    <th>Probabilidade</th>
                    <th>Erro (ppm)</th>
                    <th>Fonte</th>
                  </tr>
                </thead>
                <tbody>
                  {feature.candidates.map((candidate) => (
                    <tr key={candidate.rank}>
                      <td>
                        <div className="rank-cell">
                          <TrendingUp size={14} className={candidate.rank === 1 ? 'icon-top' : 'icon-muted'} />
                          <span className="rank-number">#{candidate.rank}</span>
                        </div>
                      </td>
                      <td className="compound-name">{candidate.name}</td>
                      <td className="compound-formula">{candidate.formula}</td>
                      <td>
                        <span className={`prob-text ${getProbClass(candidate.probability)}`}>
                          {(candidate.probability * 100).toFixed(1)}%
                        </span>
                      </td>
                      <td className="text-muted">{candidate.mass_error_ppm.toFixed(1)}</td>
                      <td>
                        <span className={`badge-source ${candidate.source.toLowerCase()}`}>
                          {candidate.source}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </article>
        ))}
      </div>

      {filteredData.length === 0 && (
        <div className="empty-state">
          <p>Nenhuma feature encontrada.</p>
        </div>
      )}
    </div>
  )
}

export default Top5Ranking