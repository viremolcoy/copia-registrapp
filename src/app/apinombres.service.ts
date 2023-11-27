import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApinombresService {
  apiUrl = 'https://jsonplaceholder.typicode.com/users';
  private nombresAleatorios = new BehaviorSubject<string[]>([]);

  constructor(private http: HttpClient) {}

  getNombresAleatorios(cantidad: number) {
    this.http.get<any[]>(`${this.apiUrl}?_limit=${cantidad}`).subscribe((data) => {
      // Extraer los nombres de la respuesta JSON
      const nombres = data.map((usuario) => usuario.name);
      // Emitir los nombres aleatorios
      this.nombresAleatorios.next(nombres);
    });
  }

  obtenerNombres() {
    return this.nombresAleatorios.asObservable();
  }
}
