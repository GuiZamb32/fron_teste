import { useState } from 'react'
import { Search, Database, ExternalLink, Beaker, Tag } from 'lucide-react'
import './ChemicalRef.css'

function ChemicalRef() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSource, setSelectedSource] = useState('all')
  
  // 1. Definição do Array de Dados (Essencial estar dentro da função ou importado)
  const compounds = [
    {
      id: 1,
      name: 'Glucose',
      formula: 'C6H12O6',
      inchikey: 'WQZGKKKJIJFFOK-GASJEMHNSA-N',
      pubchem_cid: '5793',
      chebi_id: 'CHEBI:17234',
      chemspider_id: '5589',
      molecular_weight: 180.16,
      sources: ['PubChem', 'ChEBI', 'ChemSpider'],
      classes: ['Monosaccharide', 'Hexose']
    },
    {
      id: 2,
      name: 'Caffeine',
      formula: 'C8H10N4O2',
      inchikey: 'RYYVLZVUVIJVGH-UHFFFAOYSA-N',
      pubchem_cid: '2519',
      chebi_id: 'CHEBI:27732',
      chemspider_id: '2424',
      molecular_weight: 194.19,
      sources: ['PubChem', 'ChEBI', 'ChemSpider'],
      classes: ['Alkaloid', 'Xanthine']
    },
    {
      id: 3,
      name: 'Sucrose',
      formula: 'C12H22O11',
      inchikey: 'CZMRCDWAGMRECN-UGDNZRGBSA-N',
      pubchem_cid: '5988',
      chebi_id: 'CHEBI:17992',
      chemspider_id: '5768',
      molecular_weight: 342.30,
      sources: ['PubChem', 'ChEBI'],
      classes: ['Disaccharide', 'Glycoside']
    },
    {
      id: 4,
      name: 'Aspirin',
      formula: 'C9H8O4',
      inchikey: 'BSYNRYMUTXBXSQ-UHFFFAOYSA-N',
      pubchem_cid: '2244',
      chebi_id: 'CHEBI:15365',
      chemspider_id: '2157',
      molecular_weight: 180.16,
      sources: ['PubChem', 'ChEBI', 'ChemSpider'],
      classes: ['Salicylate', 'NSAID']
    }
  ];

  // 2. Definição do Array de Fontes para os botões de estatísticas
  const sources = [
    { value: 'all', label: 'Todas as Fontes', count: compounds.length },
    { value: 'pubchem', label: 'PubChem', count: compounds.filter(c => c.sources.includes('PubChem')).length },
    { value: 'chebi', label: 'ChEBI', count: compounds.filter(c => c.sources.includes('ChEBI')).length },
    { value: 'chemspider', label: 'ChemSpider', count: compounds.filter(c => c.sources.includes('ChemSpider')).length },
  ];

  // 3. Lógica de Filtro
  const filteredCompounds = compounds.filter(compound => {
    const matchesSearch = 
      compound.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      compound.formula.toLowerCase().includes(searchTerm.toLowerCase()) ||
      compound.inchikey.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesSource = 
      selectedSource === 'all' || 
      compound.sources.some(s => s.toLowerCase() === selectedSource)
    
    return matchesSearch && matchesSource
  })

  return (
    <div className="page-container">
      <header className="page-header">
        <h1 className="page-title">Referências Químicas</h1>
        <p className="page-description">Banco integrado de compostos químicos de fontes externas</p>
      </header>
      
      {/* Estatísticas / Filtros */}
      <div className="stats-grid">
        {sources.map((source) => (
          <button
            key={source.value}
            onClick={() => setSelectedSource(source.value)}
            className={`stat-card ${selectedSource === source.value ? 'active' : ''}`}
          >
            <div className="stat-content">
              <div className="stat-info">
                <span className="stat-label">{source.label}</span>
                <span className="stat-value">{source.count}</span>
              </div>
              <Database className="stat-icon" size={32} />
            </div>
          </button>
        ))}
      </div>
      
      {/* Barra de Busca */}
      <div className="search-container">
        <div className="search-wrapper">
          <Search className="search-icon" size={20} />
          <input
            type="text"
            placeholder="Buscar por nome, fórmula ou InChIKey..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field search-input"
          />
        </div>
      </div>
      
      {/* Lista de Compostos */}
      <div className="compounds-list">
        {filteredCompounds.map((compound) => (
          <div key={compound.id} className="compound-card">
            <div className="compound-main">
              <div className="compound-info">
                <div className="compound-header">
                  <Beaker className="icon-beaker" size={24} />
                  <h3 className="compound-name">{compound.name}</h3>
                </div>
                
                <div className="compound-details">
                  <div className="detail-group">
                    <label>Fórmula Molecular</label>
                    <span className="formula">{compound.formula}</span>
                  </div>
                  <div className="detail-group">
                    <label>Peso Molecular</label>
                    <span>{compound.molecular_weight} g/mol</span>
                  </div>
                  <div className="detail-group full-width">
                    <label>InChIKey</label>
                    <span className="inchikey">{compound.inchikey}</span>
                  </div>
                </div>
                
                <div className="tag-section">
                  <label>Classes Químicas</label>
                  <div className="tag-list">
                    {compound.classes.map((cls, idx) => (
                      <span key={idx} className="badge-class">
                        <Tag size={12} />
                        <span>{cls}</span>
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="external-links">
                  <label>Identificadores Externos</label>
                  <div className="link-buttons">
                    {compound.pubchem_cid && (
                      <a 
                        href={`https://pubchem.ncbi.nlm.nih.gov/compound/${compound.pubchem_cid}`} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="ext-link pubchem"
                      >
                        PubChem: {compound.pubchem_cid} <ExternalLink size={14} />
                      </a>
                    )}
                    {compound.chebi_id && (
                      <a 
                        href={`https://www.ebi.ac.uk/chebi/searchId.do?chebiId=${compound.chebi_id}`} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="ext-link chebi"
                      >
                        ChEBI: {compound.chebi_id} <ExternalLink size={14} />
                      </a>
                    )}
                  </div>
                </div>
              </div>

              <div className="compound-sources">
                <label>Fontes</label>
                <div className="source-badges">
                  {compound.sources.map((source, idx) => (
                    <span key={idx} className={`source-badge ${source.toLowerCase()}`}>
                      {source}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredCompounds.length === 0 && (
        <div className="empty-state">
          <Database size={48} />
          <p>Nenhum composto encontrado com os critérios de busca.</p>
        </div>
      )}
    </div>
  )
}

export default ChemicalRef;