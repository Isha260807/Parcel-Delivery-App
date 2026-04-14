import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppShell from '../../components/ui/AppShell';
import TopBar from '../../components/ui/TopBar';
import SectionTitle from '../../components/ui/SectionTitle';
import ServiceCard from '../../components/ui/ServiceCard';
import { getServiceCatalog } from '../../lib/mockApi';

export default function ServicesPage() {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);

  useEffect(() => {
    getServiceCatalog().then(setServices);
  }, []);

  return (
    <AppShell>
      <TopBar title="Service Selection" subtitle="Choose your booking category" showBack />

      <div className="px-4 pb-24">
        <div className="grid-2 mt-6">
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onClick={() => !service.comingSoon && navigate(`/booking/${service.id}`)}
            />
          ))}
        </div>
      </div>
    </AppShell>
  );
}
