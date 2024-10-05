const Level2 = () => {
    return (<div className="h-full text-white flex flex-col items-center justify-center space-y-4 p-4" style={{ margin: "auto" }}>
        <h2 className="text-2xl font-bold mb-2 text-center">Level 2: The GHGs Powering Climate Change</h2>
        <p className="text-center text-sm text-gray-300 italic">Greenhouse gases (GHGs) are gases in the Earth's atmosphere that trap heat and contribute to the greenhouse effect, warming the planet. There are many greenhouse gases, but we focus most on 3 potent gases: Nitrous oxide (N₂O)-Methane (CH₄)-Carbon dioxide (CO₂). So Let’s start!</p>
        <div className="cards">
          <div className="card hover:-translate-y-2">
            <img src="/level2/ch4.jpeg" alt="CH4" />
            <h2 className='font-bold'>Methane (CH₄)</h2>
            <p className="text-sm text-gray-100 leading-5">A greenhouse gas that is the major component of natural gas and is associated with all hydrocarbon fuels. Significant human-caused methane emissions also occur as a result of some agriculture activities. Methane is also produced naturally where organic matter decays under anaerobic conditions, such as in wetlands.</p>
          </div>
          <div className="card hover:-translate-y-2">
            <img src="/level2/co2.jpeg" alt="CO₂" />
            <h2 className='font-bold'>Carbon dioxide (CO₂)</h2>
            <p className="text-sm text-gray-100 leading-5">A naturally occurring gas, CO₂ is also a byproduct of burning fossil fuels, of burning biomass, of land-use changes (LUCs) and of industrial processes. It is the main gas contributing to climate change.</p>
          </div>
          <div className="text-center card hover:-translate-y-2">
            <img src="/level2/n2o.jpeg" alt="N2O" />
            <h2 className='font-bold text-center'>Nitrous Oxide (N₂O)</h2 >
            <p className="text-sm text-gray-100 leading-5">A potent greenhouse gas, is mainly emitted from agriculture, fossil fuel combustion, and industrial processes. While it occurs naturally in soils and oceans, human activities have significantly increased its emissions, contributing to climate change.</p>
          </div>
        </div>
      </div>)

}

export default Level2;