import { MapPin } from 'lucide-react';

const InteractiveMap = () => (
    <div className="bg-gray-200 p-4 rounded-lg">
      <div className="h-64 bg-blue-300 rounded-lg flex items-center justify-center">
        <MapPin size={48} />
      </div>
      <input type="range" className="w-full mt-4" />
    </div>
);

export default InteractiveMap;