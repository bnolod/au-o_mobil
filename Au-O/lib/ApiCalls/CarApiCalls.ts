import { apiFetch } from '@/lib/apiClient';
import { CarCreationRequest } from '@/lib/request/CarCreationRequest';
import { Car } from '../entity/Car';

export async function getOwnGarage(): Promise<Car[] | null> {
  const req = await apiFetch<Car[]>('vehicles/own', 'GET', true);
  if (req && req.status === 200) {
    return req.data;
  }
  return null;
}

export async function addCar(car: CarCreationRequest): Promise<Car | null> {
  const req = await apiFetch<Car>('vehicles/vehicle/create', 'POST', true, car);
  if (req && req.status === 200) {
    return req.data;
  }
  return null;
}

export async function getOwnCars(): Promise<Car[] | null> {
  const req = await apiFetch<Car[]>('vehicles/own', 'GET', true);
  if (req && req.status === 200) {
    return req.data;
  }
  return null;
}

export async function getCarsByUserId(userId: number): Promise<Car[] | null> {
  const req = await apiFetch<Car[]>('vehicles/user/' + userId, 'GET', true);
  if (req && req.status === 200) {
    return req.data;
  }
  return null;
}

export async function getCarByCarId(carId: string): Promise<Car | null> {
  const req = await apiFetch<Car>('vehicles/vehicle/' + carId, 'GET', true);
  if (req && req.status === 200) {
    return req.data;
  }
  return null;
}

export async function editCar(carId: string, car: CarCreationRequest): Promise<boolean> {
  const req = await apiFetch('vehicles/vehicle/' + carId, 'PUT', true, car);
  if (req && req.status === 200) {
    return true;
  }
  return false;
}

export async function deleteCar(carId: string): Promise<boolean> {
  const req = await apiFetch('vehicles/vehicle/' + carId, 'DELETE', true);
  if (req && req.status === 200) {
    return true;
  }
  return false;
}
export async function getUserGarageById(id: number) {
  const res = await apiFetch<Car[]>(`vehicles/user/${id}/all`, 'GET', true);
  if (res && res.data) {
    return(res.data);
  } else return;
}