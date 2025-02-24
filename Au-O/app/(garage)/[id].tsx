import { useAuthentication } from '@/contexts/AuthenticationContext';
import LoadingModal from '@/components/ui/LoadingModal';
import { useColorScheme } from 'nativewind';
import { useLanguage } from '@/contexts/LanguageContext';
import GarageItemPage from '@/components/garage/base/GarageItemPage';
import { useEffect, useState } from 'react';
import { Car } from '@/lib/entity/Car';
import { useLocalSearchParams } from 'expo-router';
import { getCarByCarId } from '@/lib/ApiCalls/CarApiCalls';
export default function CarPage() {
  const { language } = useLanguage();
  const [car, setCar] = useState<Car>();
  const { colorScheme } = useColorScheme();
  const { id } = useLocalSearchParams();
  const { user } = useAuthentication();
  async function getCar() {
    if (id) {
      const res = await getCarByCarId(id as string);
      if (res) {
        setCar(res);
      }
    }
  }
  useEffect(() => {
    getCar();
  }, []);
  const isOwner = (user && car && user.id === car.owner?.id)!;
  if (!car) {
    return <LoadingModal colorScheme={colorScheme!} loading />;
  }
  return (
    <GarageItemPage
      isOwner={isOwner}
      car={car}
      colorScheme={colorScheme!}
      language={language}
      profileImg={car.owner!.profileImg}
    />
  );
}
