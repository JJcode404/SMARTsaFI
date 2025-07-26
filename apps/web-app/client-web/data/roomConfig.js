const roomConfig = {
  residential: [
    { key: "bedroom", label: "Bedroom", price: 500 },
    { key: "kitchen", label: "Kitchen", price: 300 },
    { key: "bathroom", label: "Bathroom", price: 400 },
  ],
  commercial: [
    { key: "retailStore", label: "Retail Store", price: 800 },
    { key: "restaurantCafe", label: "Restaurant/Cafe", price: 1000 },
    { key: "clubBar", label: "Club/Bar", price: 1200 },
    { key: "superMarket", label: "Super-Market", price: 1500 },
  ],
  laundry: [
    { key: "dryFold", label: "Dry & Fold", price: 200 },
    { key: "ironing", label: "Ironing", price: 150 },
    { key: "pressing", label: "Pressing", price: 180 },
  ],
  sanitation: [
    { key: "paperRolls", label: "Paper Rolls", price: 50 },
    { key: "dispensers", label: "Dispensers", price: 300 },
    { key: "pedalBins", label: "Pedal Bins", price: 400 },
    { key: "sanitizers", label: "Sanitizers", price: 250 },
  ],
  pestControl: [
    { key: "termites", label: "Termite Treatment", price: 3000 },
    { key: "rodents", label: "Rodent Control", price: 2500 },
    { key: "insects", label: "Insect Control", price: 2000 },
    { key: "fumigation", label: "Full Fumigation", price: 3500 },
  ],
};
export { roomConfig };
