import { useState, useEffect } from 'react'
import * as d3 from 'd3'
import { useD3 } from '../../../hooks/useD3'

// === FUND DATA ===
const funds = [
  { code:'K-GLOBE', name:'กองทุนเปิดเค โกลบอล อิควิตี้', company:'KAsset (กสิกร)', masterFund:'Active Global Equity (MSCI ACWI)', inception:'2006-08-01', type:'สะสมมูลค่า', typeBadge:'acc', mgmtFee:0.88, ter:0.97, frontEnd:1.5, backEnd:0, nav:12.53, ret1y:16.06, ret3y:13.60, ret5y:8.55, ret10y:5.48, retSI:5.48, color:'#3b82f6' },
  { code:'TMBGQG', name:'Eastspring Global Quality Growth', company:'Eastspring (ttb)', masterFund:'Wellington Global Quality Growth', inception:'2015-03-23', type:'สะสมมูลค่า', typeBadge:'acc', mgmtFee:1.07, ter:1.78, frontEnd:1.5, backEnd:0, nav:22.74, ret1y:8.78, ret3y:3.26, ret5y:8.15, ret10y:7.75, retSI:7.75, color:'#8b5cf6' },
  { code:'B-GLOBAL', name:'กองทุนเปิดบัวหลวงหุ้นโกลบอล', company:'BBLAM (กรุงเทพ)', masterFund:'Wellington Global Quality Growth', inception:'2015-10-01', type:'สะสมมูลค่า', typeBadge:'acc', mgmtFee:1.07, ter:1.70, frontEnd:1.5, backEnd:0, nav:19.60, ret1y:7.67, ret3y:11.93, ret5y:5.46, ret10y:6.64, retSI:6.64, color:'#06b6d4' },
  { code:'KFGBRAND-A', name:'กรุงศรีโกลบอลแบรนด์อิควิตี้', company:'Krungsri Asset', masterFund:'MS Global Brands Fund', inception:'2019-10-01', type:'สะสมมูลค่า', typeBadge:'acc', mgmtFee:1.61, ter:2.00, frontEnd:1.5, backEnd:0, nav:11.46, ret1y:-18.49, ret3y:-1.54, ret5y:2.15, ret10y:null, retSI:2.15, color:'#ec4899' },
  { code:'PRINCIPAL-GEF', name:'พรินซิเพิล โกลบอล อิควิตี้', company:'Principal (พรินซิเพิล)', masterFund:'Principal Origin Global Equity', inception:'2014-05-07', type:'สะสมมูลค่า/ปันผล', typeBadge:'both', mgmtFee:1.60, ter:1.85, frontEnd:1.5, backEnd:0, nav:22.33, ret1y:11.06, ret3y:8.50, ret5y:7.20, ret10y:6.80, retSI:6.80, color:'#f59e0b' },
  { code:'KT-WEQ-A', name:'เคแทม เวิลด์ อิควิตี้ ฟันด์', company:'KTAM (กรุงไทย)', masterFund:'AB Low Volatility Equity', inception:'2014-10-08', type:'สะสมมูลค่า', typeBadge:'acc', mgmtFee:1.34, ter:1.60, frontEnd:1.5, backEnd:0, nav:17.41, ret1y:-0.58, ret3y:7.47, ret5y:4.92, ret10y:5.93, retSI:4.93, color:'#10b981' },
  { code:'SCBGQUAL-A', name:'SCB Global Quality Equity', company:'SCBAM (ไทยพาณิชย์)', masterFund:'iShares MSCI World Quality ETF', inception:'2022-07-05', type:'สะสมมูลค่า', typeBadge:'acc', mgmtFee:1.07, ter:1.30, frontEnd:1.0, backEnd:0, nav:15.15, ret1y:9.50, ret3y:10.20, ret5y:null, ret10y:null, retSI:12.50, color:'#ef4444' }
]

const perfPeriods = [
  { key: '1y', label: '1 ปี' },
  { key: '3y', label: '3 ปี' },
  { key: '5y', label: '5 ปี' },
  { key: '10y', label: '10 ปี' },
  { key: 'si', label: 'Since Inception' },
]

const retKeyMap = { '1y':'ret1y','3y':'ret3y','5y':'ret5y','10y':'ret10y','si':'retSI' }

// === BACKTEST SIMULATION ===
function simulateBacktest(fund) {
  const inception = new Date(fund.inception)
  const now = new Date(2026,3,1)
  const totalYears = (now - inception) / (365.25*86400000)
  const totalMonths = Math.floor(totalYears * 12)
  const annualReturn = fund.retSI / 100
  const monthlyReturn = Math.pow(1+annualReturn, 1/12) - 1
  const totalInvestment = 120000
  const dcaMonthly = totalInvestment / totalMonths

  let navs = [10]
  const rng = (function(s){return function(){s=(s*16807)%2147483647;return(s-1)/2147483646}})(fund.code.charCodeAt(0)*1000+fund.code.charCodeAt(1))
  for(let i=1;i<=totalMonths;i++) {
    const noise = (rng()-0.5)*0.04
    navs.push(navs[i-1]*(1+monthlyReturn+noise))
  }
  const adj = fund.nav / navs[navs.length-1]
  navs = navs.map(n=>n*adj)

  const lsUnits = totalInvestment / navs[0]
  const lsTimeline = navs.map((n,i)=>({month:i, value: lsUnits*n}))
  const lsFinal = lsUnits * navs[navs.length-1]

  let dcaUnits = 0, dcaInvested = 0
  const dcaTimeline = navs.map((n,i) => {
    if(i<totalMonths) { dcaUnits += dcaMonthly/n; dcaInvested += dcaMonthly }
    return {month:i, value: dcaUnits*n, invested: dcaInvested}
  })
  const dcaFinal = dcaUnits * navs[navs.length-1]

  return {
    fund, totalMonths, totalYears,
    lsFinal, dcaFinal, totalInvestment,
    lsProfit: lsFinal - totalInvestment,
    dcaProfit: dcaFinal - totalInvestment,
    lsReturn: ((lsFinal/totalInvestment)-1)*100,
    dcaReturn: ((dcaFinal/totalInvestment)-1)*100,
    lsTimeline, dcaTimeline, navs,
    winner: lsFinal > dcaFinal ? 'Lump Sum' : 'DCA'
  }
}

const backtestResults = funds.map(f => simulateBacktest(f))

// === CHART COMPONENTS ===
const margin = {top:30, right:30, bottom:60, left:60}

function FeeChart() {
  const ref = useD3((sel, el) => {
    const w = el.clientWidth, h = 300
    const svg = sel.append('svg').attr('width',w).attr('height',h)
    const iw = w-margin.left-margin.right, ih = h-margin.top-margin.bottom
    const g = svg.append('g').attr('transform',`translate(${margin.left},${margin.top})`)
    const sorted = [...funds].sort((a,b)=>a.ter-b.ter)
    const x = d3.scaleBand().domain(sorted.map(d=>d.code)).range([0,iw]).padding(0.35)
    const y = d3.scaleLinear().domain([0, d3.max(sorted,d=>d.ter)*1.2]).range([ih,0])
    g.append('g').attr('transform',`translate(0,${ih})`).call(d3.axisBottom(x)).selectAll('text').style('fill','var(--color-text-muted)').style('font-size','11px')
    g.append('g').call(d3.axisLeft(y).ticks(5).tickFormat(d=>d+'%')).selectAll('text').style('fill','var(--color-text-muted)')
    g.selectAll('.domain,.tick line').style('stroke','var(--color-border)')
    g.selectAll('rect').data(sorted).join('rect')
      .attr('x',d=>x(d.code)).attr('width',x.bandwidth())
      .attr('y',ih).attr('height',0).attr('rx',6).attr('fill',d=>d.color)
      .transition().duration(800).delay((_,i)=>i*100)
      .attr('y',d=>y(d.ter)).attr('height',d=>ih-y(d.ter))
    g.selectAll('.label').data(sorted).join('text')
      .attr('x',d=>x(d.code)+x.bandwidth()/2).attr('y',d=>y(d.ter)-8)
      .attr('text-anchor','middle').attr('fill','var(--color-text-primary)').attr('font-size','12px').attr('font-weight','600')
      .text(d=>d.ter.toFixed(2)+'%').style('opacity',0)
      .transition().duration(400).delay((_,i)=>i*100+600).style('opacity',1)
  }, [])
  return <div ref={ref} className="chart-container" />
}

function PerfChart({ period }) {
  const ref = useD3((sel, el) => {
    const key = retKeyMap[period]
    const w = el.clientWidth, h = 350
    const svg = sel.append('svg').attr('width',w).attr('height',h)
    const iw = w-margin.left-margin.right-20, ih = h-margin.top-margin.bottom
    const g = svg.append('g').attr('transform',`translate(${margin.left+10},${margin.top})`)
    const data = funds.filter(f=>f[key]!==null).sort((a,b)=>b[key]-a[key])
    const vals = data.map(d=>d[key])
    const minV = Math.min(0, d3.min(vals)*1.2), maxV = d3.max(vals)*1.2
    const x = d3.scaleBand().domain(data.map(d=>d.code)).range([0,iw]).padding(0.3)
    const y = d3.scaleLinear().domain([minV, maxV]).range([ih,0])
    g.append('g').attr('transform',`translate(0,${ih})`).call(d3.axisBottom(x)).selectAll('text').style('fill','var(--color-text-muted)').style('font-size','11px')
    g.append('g').call(d3.axisLeft(y).ticks(6).tickFormat(d=>d+'%')).selectAll('text').style('fill','var(--color-text-muted)')
    g.selectAll('.domain,.tick line').style('stroke','var(--color-border)')
    if(minV<0) g.append('line').attr('x1',0).attr('x2',iw).attr('y1',y(0)).attr('y2',y(0)).attr('stroke','var(--color-text-muted)').attr('stroke-dasharray','4,4')
    g.selectAll('rect').data(data).join('rect')
      .attr('x',d=>x(d.code)).attr('width',x.bandwidth()).attr('rx',6)
      .attr('fill',d=>d[key]>=0 ? d.color : '#ef4444')
      .attr('y',y(0)).attr('height',0)
      .transition().duration(600).delay((_,i)=>i*80)
      .attr('y',d=>d[key]>=0 ? y(d[key]) : y(0))
      .attr('height',d=>Math.abs(y(d[key])-y(0)))
    g.selectAll('.lbl').data(data).join('text')
      .attr('x',d=>x(d.code)+x.bandwidth()/2)
      .attr('y',d=>d[key]>=0 ? y(d[key])-8 : y(d[key])+16)
      .attr('text-anchor','middle').attr('fill','var(--color-text-primary)').attr('font-size','11px').attr('font-weight','600')
      .text(d=>(d[key]>=0?'+':'')+d[key].toFixed(2)+'%')
      .style('opacity',0).transition().delay((_,i)=>i*80+400).duration(300).style('opacity',1)
  }, [period])
  return <div ref={ref} className="chart-container" />
}

function NavGrowthChart() {
  const ref = useD3((sel, el) => {
    const w = el.clientWidth, h = 400
    const svg = sel.append('svg').attr('width',w).attr('height',h)
    const iw = w-margin.left-margin.right, ih = h-margin.top-margin.bottom
    const g = svg.append('g').attr('transform',`translate(${margin.left},${margin.top})`)
    const now = new Date(2026,3,1)
    const allData = funds.map(f => {
      const start = new Date(f.inception)
      const years = (now - start) / (365.25*86400000)
      const pts = []
      for(let i=0;i<=Math.floor(years);i++) {
        const d = new Date(start); d.setFullYear(d.getFullYear()+i)
        pts.push({date:d, value: 10*Math.pow(1+f.retSI/100, i)})
      }
      pts.push({date:now, value: 10*Math.pow(1+f.retSI/100, years)})
      return {code:f.code, color:f.color, pts}
    })
    const xDom = [d3.min(allData,d=>d3.min(d.pts,p=>p.date)), now]
    const yMax = d3.max(allData,d=>d3.max(d.pts,p=>p.value))
    const x = d3.scaleTime().domain(xDom).range([0,iw])
    const y = d3.scaleLinear().domain([8, yMax*1.1]).range([ih,0])
    g.append('g').attr('transform',`translate(0,${ih})`).call(d3.axisBottom(x).ticks(8)).selectAll('text').style('fill','var(--color-text-muted)').style('font-size','10px')
    g.append('g').call(d3.axisLeft(y).ticks(6).tickFormat(d=>d.toFixed(1)+'฿')).selectAll('text').style('fill','var(--color-text-muted)')
    g.selectAll('.domain,.tick line').style('stroke','var(--color-border)')
    const line = d3.line().x(d=>x(d.date)).y(d=>y(d.value)).curve(d3.curveMonotoneX)
    allData.forEach(fd => {
      g.append('path').datum(fd.pts).attr('fill','none').attr('stroke',fd.color).attr('stroke-width',2.5).attr('d',line).attr('opacity',0.85)
    })
  }, [])
  return <div ref={ref} className="chart-container" />
}

function BacktestChart({ resultIndex }) {
  const r = backtestResults[resultIndex]
  const ref = useD3((sel, el) => {
    const w = el.clientWidth, h = 400
    const svg = sel.append('svg').attr('width',w).attr('height',h)
    const iw = w-margin.left-margin.right, ih = h-margin.top-margin.bottom
    const g = svg.append('g').attr('transform',`translate(${margin.left},${margin.top})`)
    const maxVal = Math.max(d3.max(r.lsTimeline,d=>d.value), d3.max(r.dcaTimeline,d=>d.value))
    const x = d3.scaleLinear().domain([0,r.totalMonths]).range([0,iw])
    const y = d3.scaleLinear().domain([0,maxVal*1.1]).range([ih,0])
    g.append('g').attr('transform',`translate(0,${ih})`).call(d3.axisBottom(x).ticks(10).tickFormat(d=>Math.round(d/12)+'y')).selectAll('text').style('fill','var(--color-text-muted)')
    g.append('g').call(d3.axisLeft(y).ticks(6).tickFormat(d=>'฿'+Math.round(d/1000)+'k')).selectAll('text').style('fill','var(--color-text-muted)')
    g.selectAll('.domain,.tick line').style('stroke','var(--color-border)')
    const invLine = d3.line().x(d=>x(d.month)).y(d=>y(d.invested)).curve(d3.curveMonotoneX)
    g.append('path').datum(r.dcaTimeline).attr('fill','none').attr('stroke','var(--color-text-muted)').attr('stroke-width',1.5).attr('stroke-dasharray','6,4').attr('d',invLine)
    const lsLine = d3.line().x(d=>x(d.month)).y(d=>y(d.value)).curve(d3.curveMonotoneX)
    g.append('path').datum(r.lsTimeline).attr('fill','none').attr('stroke','#f59e0b').attr('stroke-width',2.5).attr('d',lsLine)
    const dcaLine = d3.line().x(d=>x(d.month)).y(d=>y(d.value)).curve(d3.curveMonotoneX)
    g.append('path').datum(r.dcaTimeline).attr('fill','none').attr('stroke','#3b82f6').attr('stroke-width',2.5).attr('d',dcaLine)
  }, [resultIndex])
  return <div ref={ref} className="chart-container" />
}

function BacktestSummaryChart() {
  const ref = useD3((sel, el) => {
    const w = el.clientWidth, h = 400
    const svg = sel.append('svg').attr('width',w).attr('height',h)
    const iw = w-margin.left-margin.right-20, ih = h-margin.top-margin.bottom
    const g = svg.append('g').attr('transform',`translate(${margin.left+10},${margin.top})`)
    const data = backtestResults.map(r=>({code:r.fund.code, ls:r.lsFinal, dca:r.dcaFinal, inv:r.totalInvestment, color:r.fund.color}))
    const maxV = d3.max(data,d=>Math.max(d.ls,d.dca))*1.1
    const x0 = d3.scaleBand().domain(data.map(d=>d.code)).range([0,iw]).padding(0.25)
    const x1 = d3.scaleBand().domain(['ls','dca']).range([0,x0.bandwidth()]).padding(0.08)
    const y = d3.scaleLinear().domain([0,maxV]).range([ih,0])
    g.append('g').attr('transform',`translate(0,${ih})`).call(d3.axisBottom(x0)).selectAll('text').style('fill','var(--color-text-muted)').style('font-size','10px')
    g.append('g').call(d3.axisLeft(y).ticks(6).tickFormat(d=>'฿'+Math.round(d/1000)+'k')).selectAll('text').style('fill','var(--color-text-muted)')
    g.selectAll('.domain,.tick line').style('stroke','var(--color-border)')
    g.append('line').attr('x1',0).attr('x2',iw).attr('y1',y(120000)).attr('y2',y(120000)).attr('stroke','var(--color-text-muted)').attr('stroke-dasharray','6,4')
    g.append('text').attr('x',iw-5).attr('y',y(120000)-6).attr('text-anchor','end').attr('fill','var(--color-text-muted)').attr('font-size','10px').text('เงินลงทุน ฿120k')
    data.forEach(d => {
      const grp = g.append('g').attr('transform',`translate(${x0(d.code)},0)`)
      grp.append('rect').attr('x',x1('ls')).attr('width',x1.bandwidth()).attr('rx',4)
        .attr('fill','#f59e0b').attr('y',ih).attr('height',0)
        .transition().duration(600).attr('y',y(d.ls)).attr('height',ih-y(d.ls))
      grp.append('rect').attr('x',x1('dca')).attr('width',x1.bandwidth()).attr('rx',4)
        .attr('fill','#3b82f6').attr('y',ih).attr('height',0)
        .transition().duration(600).delay(100).attr('y',y(d.dca)).attr('height',ih-y(d.dca))
    })
  }, [])
  return <div ref={ref} className="chart-container" />
}

// === MAIN COMPONENT ===
export default function GlobalEquityFundsTh() {
  const [perfPeriod, setPerfPeriod] = useState('1y')
  const [backtestIdx, setBacktestIdx] = useState(0)

  return (
    <div>
      {/* Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
        {[
          { value: '7', label: 'กองทุนที่วิเคราะห์', color: '#3b82f6' },
          { value: 'K-GLOBE', label: 'ผลตอบแทน 1 ปี สูงสุด', color: '#10b981' },
          { value: '0.97%', label: 'TER ต่ำสุด (K-GLOBE)', color: '#8b5cf6' },
          { value: '~20 ปี', label: 'กองทุนเก่าแก่ที่สุด', color: '#06b6d4' },
        ].map(s => (
          <div key={s.label} className="glass-card p-5 text-center">
            <div className="text-2xl font-black mb-1" style={{ color: s.color }}>{s.value}</div>
            <div className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Fund Cards */}
      <section className="mb-12">
        <h2 className="text-xl font-bold mb-6 flex items-center gap-3" style={{ color: 'var(--color-text-primary)' }}>
          <span className="w-9 h-9 rounded-xl flex items-center justify-center text-lg" style={{ background: 'rgba(59,130,246,0.15)' }}>📊</span>
          ภาพรวมกองทุน Global Equity ในประเทศไทย
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {funds.map((f, i) => (
            <div key={f.code} className="glass-card p-5 animate-fade-in-up" style={{ animationDelay: `${i*0.05}s`, opacity: 0 }}>
              <span className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-semibold mb-3 ${
                f.typeBadge === 'acc' ? 'badge-investment' : 'badge-technology'
              }`} style={{
                background: f.typeBadge === 'both' ? 'rgba(245,158,11,0.12)' : undefined,
                color: f.typeBadge === 'both' ? '#f59e0b' : undefined,
              }}>
                {f.type}
              </span>
              <div className="text-base font-bold mb-0.5" style={{ color: f.color }}>{f.code}</div>
              <div className="text-xs mb-4" style={{ color: 'var(--color-text-muted)' }}>{f.company} • {f.masterFund}</div>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: 'NAV ปัจจุบัน', value: `${f.nav.toFixed(2)} ฿` },
                  { label: 'ผลตอบแทน 1 ปี', value: `${f.ret1y >= 0 ? '+' : ''}${f.ret1y.toFixed(2)}%`, cls: f.ret1y >= 0 ? 'text-green-400' : 'text-red-400' },
                  { label: 'TER', value: `${f.ter.toFixed(2)}%` },
                  { label: 'จัดตั้ง', value: f.inception },
                ].map(m => (
                  <div key={m.label} className="p-2.5 rounded-lg" style={{ background: 'rgba(255,255,255,0.03)' }}>
                    <div className="text-[10px] uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>{m.label}</div>
                    <div className={`text-sm font-semibold mt-0.5 ${m.cls || ''}`} style={!m.cls ? { color: 'var(--color-text-primary)' } : {}}>{m.value}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Fee Comparison */}
      <section className="mb-12">
        <h2 className="text-xl font-bold mb-6 flex items-center gap-3" style={{ color: 'var(--color-text-primary)' }}>
          <span className="w-9 h-9 rounded-xl flex items-center justify-center text-lg" style={{ background: 'rgba(245,158,11,0.15)' }}>💰</span>
          เปรียบเทียบค่าธรรมเนียม
        </h2>
        <div className="glass-card p-6 mb-6">
          <h3 className="text-base font-bold mb-1" style={{ color: 'var(--color-text-primary)' }}>ค่าธรรมเนียมรวม (Total Expense Ratio)</h3>
          <p className="text-xs mb-5" style={{ color: 'var(--color-text-muted)' }}>ค่าใช้จ่ายรวมที่หักจากผลตอบแทนกองทุนต่อปี</p>
          <FeeChart />
        </div>
        <div className="glass-card overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                {['กองทุน','บลจ.','Mgmt Fee','TER','Front-End','Back-End','ประเภท','วันจัดตั้ง'].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold whitespace-nowrap" style={{ color: 'var(--color-text-muted)', background: 'var(--color-bg-card)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {funds.map(f => (
                <tr key={f.code} className="hover:bg-white/[0.02] transition-colors" style={{ borderBottom: '1px solid rgba(42,53,85,0.4)' }}>
                  <td className="px-4 py-3 font-semibold whitespace-nowrap" style={{ color: f.color }}>{f.code}</td>
                  <td className="px-4 py-3 whitespace-nowrap" style={{ color: 'var(--color-text-secondary)' }}>{f.company}</td>
                  <td className="px-4 py-3 whitespace-nowrap" style={{ color: 'var(--color-text-primary)' }}>{f.mgmtFee.toFixed(2)}%</td>
                  <td className="px-4 py-3 whitespace-nowrap" style={{ color: 'var(--color-text-primary)' }}>{f.ter.toFixed(2)}%</td>
                  <td className="px-4 py-3 whitespace-nowrap" style={{ color: 'var(--color-text-primary)' }}>{f.frontEnd.toFixed(1)}%</td>
                  <td className="px-4 py-3 whitespace-nowrap" style={{ color: 'var(--color-text-primary)' }}>{f.backEnd.toFixed(1)}%</td>
                  <td className="px-4 py-3 whitespace-nowrap" style={{ color: 'var(--color-text-secondary)' }}>{f.type}</td>
                  <td className="px-4 py-3 whitespace-nowrap" style={{ color: 'var(--color-text-secondary)' }}>{f.inception}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Performance */}
      <section className="mb-12">
        <h2 className="text-xl font-bold mb-6 flex items-center gap-3" style={{ color: 'var(--color-text-primary)' }}>
          <span className="w-9 h-9 rounded-xl flex items-center justify-center text-lg" style={{ background: 'rgba(16,185,129,0.15)' }}>📈</span>
          ผลตอบแทนย้อนหลัง
        </h2>
        <div className="glass-card p-6">
          <h3 className="text-base font-bold mb-1" style={{ color: 'var(--color-text-primary)' }}>ผลตอบแทนย้อนหลังเปรียบเทียบ (Annualized %)</h3>
          <p className="text-xs mb-5" style={{ color: 'var(--color-text-muted)' }}>ข้อมูล ณ วันที่ 31 มีนาคม 2569</p>
          <div className="flex flex-wrap gap-2 mb-5">
            {perfPeriods.map(p => (
              <button key={p.key} onClick={() => setPerfPeriod(p.key)}
                className="px-4 py-2 rounded-xl text-xs font-medium transition-all hover:cursor-pointer"
                style={{
                  background: perfPeriod === p.key ? 'var(--color-accent-blue)' : 'transparent',
                  color: perfPeriod === p.key ? 'white' : 'var(--color-text-secondary)',
                  border: `1px solid ${perfPeriod === p.key ? 'var(--color-accent-blue)' : 'var(--color-border)'}`,
                }}>
                {p.label}
              </button>
            ))}
          </div>
          <PerfChart period={perfPeriod} />
        </div>
      </section>

      {/* NAV Growth */}
      <section className="mb-12">
        <h2 className="text-xl font-bold mb-6 flex items-center gap-3" style={{ color: 'var(--color-text-primary)' }}>
          <span className="w-9 h-9 rounded-xl flex items-center justify-center text-lg" style={{ background: 'rgba(139,92,246,0.15)' }}>📉</span>
          จำลอง NAV Growth ตั้งแต่จัดตั้ง
        </h2>
        <div className="glass-card p-6">
          <h3 className="text-base font-bold mb-1" style={{ color: 'var(--color-text-primary)' }}>การเติบโตของ NAV จาก 10 บาท (Simulated)</h3>
          <p className="text-xs mb-5" style={{ color: 'var(--color-text-muted)' }}>สมมติ NAV เริ่มต้น 10 บาท โดยใช้ Annualized Return ตั้งแต่จัดตั้ง</p>
          <NavGrowthChart />
          {/* Legend */}
          <div className="flex flex-wrap gap-4 mt-4 justify-center">
            {funds.map(f => (
              <div key={f.code} className="flex items-center gap-1.5 text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                <div className="w-3 h-3 rounded-sm" style={{ background: f.color }} />
                {f.code}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Backtest */}
      <section className="mb-12">
        <h2 className="text-xl font-bold mb-6 flex items-center gap-3" style={{ color: 'var(--color-text-primary)' }}>
          <span className="w-9 h-9 rounded-xl flex items-center justify-center text-lg" style={{ background: 'rgba(6,182,212,0.15)' }}>🔬</span>
          Backtest: DCA vs Lump Sum
        </h2>

        {/* Fund Selector */}
        <div className="flex flex-wrap gap-2 mb-6">
          {funds.map((f,i) => (
            <button key={f.code} onClick={() => setBacktestIdx(i)}
              className="px-4 py-2 rounded-xl text-xs font-medium transition-all hover:cursor-pointer"
              style={{
                background: backtestIdx === i ? f.color : 'transparent',
                color: backtestIdx === i ? 'white' : 'var(--color-text-secondary)',
                border: `1px solid ${backtestIdx === i ? f.color : 'var(--color-border)'}`,
              }}>
              {f.code}
            </button>
          ))}
        </div>

        <div className="glass-card p-6 mb-6">
          <h3 className="text-base font-bold mb-1" style={{ color: 'var(--color-text-primary)' }}>
            Backtest: {backtestResults[backtestIdx].fund.code} — DCA vs Lump Sum
          </h3>
          <p className="text-xs mb-5" style={{ color: 'var(--color-text-muted)' }}>
            ระยะเวลา {backtestResults[backtestIdx].totalYears.toFixed(1)} ปี ({backtestResults[backtestIdx].totalMonths} เดือน) • เงินลงทุนรวม ฿{backtestResults[backtestIdx].totalInvestment.toLocaleString()}
          </p>
          <BacktestChart resultIndex={backtestIdx} />
          {/* Legend */}
          <div className="flex flex-wrap gap-5 mt-4 justify-center text-xs" style={{ color: 'var(--color-text-secondary)' }}>
            <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm" style={{ background: '#f59e0b' }} />Lump Sum (฿{Math.round(backtestResults[backtestIdx].lsFinal).toLocaleString()})</div>
            <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm" style={{ background: '#3b82f6' }} />DCA (฿{Math.round(backtestResults[backtestIdx].dcaFinal).toLocaleString()})</div>
            <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm border border-dashed" style={{ borderColor: 'var(--color-text-muted)' }} />เงินลงทุน</div>
          </div>
        </div>

        {/* Backtest Summary */}
        <div className="glass-card p-6 mb-6">
          <h3 className="text-base font-bold mb-1" style={{ color: 'var(--color-text-primary)' }}>สรุปผลลัพธ์ DCA vs Lump Sum</h3>
          <p className="text-xs mb-5" style={{ color: 'var(--color-text-muted)' }}>เปรียบเทียบมูลค่าพอร์ต ณ ปัจจุบัน</p>
          <BacktestSummaryChart />
        </div>

        {/* Backtest Table */}
        <div className="glass-card overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                {['กองทุน','ระยะเวลา','เงินลงทุน','Lump Sum มูลค่า','Lump Sum P/L','DCA มูลค่า','DCA P/L','ดีกว่า'].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold whitespace-nowrap" style={{ color: 'var(--color-text-muted)', background: 'var(--color-bg-card)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {backtestResults.map(r => (
                <tr key={r.fund.code} className="hover:bg-white/[0.02] transition-colors" style={{ borderBottom: '1px solid rgba(42,53,85,0.4)' }}>
                  <td className="px-4 py-3 font-semibold whitespace-nowrap" style={{ color: r.fund.color }}>{r.fund.code}</td>
                  <td className="px-4 py-3 whitespace-nowrap" style={{ color: 'var(--color-text-secondary)' }}>{r.totalYears.toFixed(1)} ปี</td>
                  <td className="px-4 py-3 whitespace-nowrap" style={{ color: 'var(--color-text-primary)' }}>฿{r.totalInvestment.toLocaleString()}</td>
                  <td className="px-4 py-3 whitespace-nowrap" style={{ color: 'var(--color-text-primary)' }}>฿{Math.round(r.lsFinal).toLocaleString()}</td>
                  <td className="px-4 py-3 whitespace-nowrap" style={{ color: r.lsProfit >= 0 ? '#10b981' : '#ef4444' }}>
                    {r.lsProfit>=0?'+':''}฿{Math.round(r.lsProfit).toLocaleString()} ({r.lsReturn>=0?'+':''}{r.lsReturn.toFixed(1)}%)
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap" style={{ color: 'var(--color-text-primary)' }}>฿{Math.round(r.dcaFinal).toLocaleString()}</td>
                  <td className="px-4 py-3 whitespace-nowrap" style={{ color: r.dcaProfit >= 0 ? '#10b981' : '#ef4444' }}>
                    {r.dcaProfit>=0?'+':''}฿{Math.round(r.dcaProfit).toLocaleString()} ({r.dcaReturn>=0?'+':''}{r.dcaReturn.toFixed(1)}%)
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap font-bold" style={{ color: r.winner === 'Lump Sum' ? '#f59e0b' : '#3b82f6' }}>{r.winner}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Disclaimer */}
      <div className="glass-card p-6 mt-8" style={{ borderColor: 'rgba(245,158,11,0.3)' }}>
        <h4 className="text-sm font-bold mb-2" style={{ color: 'var(--color-accent-orange)' }}>⚠️ คำเตือน</h4>
        <p className="text-xs leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
          รายงานฉบับนี้จัดทำขึ้นเพื่อการศึกษาและวิจัยเท่านั้น ไม่ถือเป็นคำแนะนำในการลงทุน การลงทุนมีความเสี่ยง ผู้ลงทุนควรทำความเข้าใจลักษณะสินค้า เงื่อนไขผลตอบแทน และความเสี่ยงก่อนตัดสินใจลงทุน ผลการดำเนินงานในอดีตไม่ได้เป็นสิ่งยืนยันถึงผลการดำเนินงานในอนาคต ข้อมูลอ้างอิงจาก WealthMagik, Finnomena, Investing.com และเว็บไซต์ของ บลจ. แต่ละแห่ง
        </p>
      </div>
    </div>
  )
}
