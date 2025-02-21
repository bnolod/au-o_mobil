import { apiFetch } from "@/lib/apiClient";
import { CarResponse } from "@/lib/response/CarResponse";
import { CarCreationRequest } from "@/lib/request/CarCreationRequest";

export async function getOwnGarage(): Promise<CarResponse[] | null> {
    const req = await apiFetch<CarResponse[]>("vehicles/own", "GET", true);
    if (req && req.status === 200) {
        return req.data;
    }
    return null;
}


export async function addCar(
    car: CarCreationRequest
): Promise<CarResponse | null> {
    const req = await apiFetch<CarResponse>(
        "vehicles/vehicle/create",
        "POST",
        true,
        car
    );
    if (req && req.status === 200) {
        return req.data;
    }
    return null;
}


export async function getOwnCars(): Promise<CarResponse[] | null> {
    const req = await apiFetch<CarResponse[]>("vehicles/own", "GET", true);
    if (req && req.status === 200) {
        return req.data;
    }
    return null;
}


export async function getCarsByUserId(
    userId: number
): Promise<CarResponse[] | null> {
    const req = await apiFetch<CarResponse[]>(
        "vehicles/user/" + userId,
        "GET",
        true
    );
    if (req && req.status === 200) {
        return req.data;
    }
    return null;
}


export async function getCarByCarId(
    carId: string
): Promise<CarResponse | null> {
    const req = await apiFetch<CarResponse>(
        "vehicles/vehicle/" + carId,
        "GET",
        true
    );
    if (req && req.status === 200) {
        return req.data;
    }
    return null;
}


export async function editCar(
    carId: string,
    car: CarCreationRequest
): Promise<boolean> {
    const req = await apiFetch("vehicles/vehicle/" + carId, "PUT", true, car);
    if (req && req.status === 200) {
        return true;
    }
    return false;
}


export async function deleteCar(carId: string): Promise<boolean> {
    const req = await apiFetch("vehicles/vehicle/" + carId, "DELETE", true);
    if (req && req.status === 200) {
        return true;
    }
    return false;
}
