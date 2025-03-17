/**
 * Autókhoz kapcsolódó API hívások
 * @module ApiCalls/CarApiCalls
 * @category API
 */

import { apiFetch } from '@/lib/apiClient';
import { CarCreationRequest } from '@/lib/request/CarCreationRequest';
import { Car } from '../entity/Car';
import { Post } from '../entity/Post';

/**
 * Felhasználó saját garázsában található autók lekérdezése
 * 
 * @returns {Promise<Car[] | null>} Felhasználó saját garázsában található autók, vagy null 
 */
export async function getOwnGarage(): Promise<Car[] | null> {
  const req = await apiFetch<Car[]>('vehicles/own', 'GET', true);
  if (req && req.status === 200) {
    return req.data;
  }
  return null;
}
/**
 * Létrehoz egy új autót
 * @param {CarCreationRequest} car
 *   
 * @returns {Promise<Car | null>} Az új autó, vagy null
 */
export async function addCar(car: CarCreationRequest): Promise<Car | null> {
  const req = await apiFetch<Car>('vehicles/vehicle/create', 'POST', true, car);
  if (req && req.status === 200) {
    return req.data;
  }
  return null;
}
/**
 * Felhasználóhoz tartozó autók lekérdezése
 * @param {number} userId
 * 
 * @returns {Promise<Car[] | null>} Felhasználóhoz tartozó autók, vagy null
 */
export async function getCarsByUserId(userId: number): Promise<Car[] | null> {
  const req = await apiFetch<Car[]>('vehicles/user/' + userId, 'GET', true);
  if (req && req.status === 200) {
    return req.data;
  }
  return null;
}
/**
 * Autó részleteinek lekérdezése azonosító alapján
 * @param {number} carId 
 * 
 * @returns {Promise<Car | null>} Az autó részletei, vagy null
 */
export async function getCarByCarId(carId: string): Promise<Car | null> {
  const req = await apiFetch<Car>('vehicles/vehicle/' + carId, 'GET', true);
  if (req && req.status === 200) {
    return req.data;
  }
  return null;
}
/**
 * Autó módosítása
 * @param {number} carId 
 * @param {CarCreationRequest} car
 * @see CarCreationRequest
 *  
 * @returns {Promise<boolean>} Módosítás sikeressége
 */
export async function editCar(carId: number, car: CarCreationRequest): Promise<boolean> {
  const req = await apiFetch('vehicles/vehicle/' + carId, 'PUT', true, car);
  if (req && req.status === 200) {
    return true;
  }
  return false;
}
/**
 * Autó törlése
 * @param {number} carId Törlésre szánt autó azonosítója
 * 
 * @returns {Promise<boolean>} Törlés sikeressége 
 */
export async function deleteCar(carId: number): Promise<boolean> {
  const req = await apiFetch('vehicles/vehicle/' + carId, 'DELETE', true);
  if (req && req.status === 200) {
    return true;
  }
  return false;
}
/**
 * Felhasználó garázsának lekérdezése
 * 
 * @returns {Promise<Car[] | null>} Autók, vagy null
 */
export async function getUserGarageById(id: number) {
  const res = await apiFetch<Car[]>(`vehicles/user/${id}/all`, 'GET', true);
  if (res && res.data) {
    return(res.data);
  } else return;
}
/**
 * Posztok lekérdezése az autó azonosítója alapján
 * 
 * @param id Autó azonosítója 
 * @returns {Promise<Post[] | null} Posztok, vagy null
 */
export async function getPostsByVehicleId(id: number) {
  const res = await apiFetch<Post[]>("posts/vehicle/" + id, 'GET', true);
  if (res && res.data) {
    return res.data
  }
  return null
}