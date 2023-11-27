import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedInEmailKey = 'loggedInEmail';
  private usersKey = 'users';
  private scheduleKeyPrefix = 'userSchedule_';
  private selectedClassKey = 'selectedClass';
  private schedule$ = new BehaviorSubject<any>(null);
  private selectedClass$ = new BehaviorSubject<any>(null);
  public scheduleObservable = this.schedule$.asObservable();
  public selectedClassObservable = this.selectedClass$.asObservable();
  userSchedule: any;
  selectedClass: any = null;

  constructor() {}

  private getUsers(): any[] {
    const storedUsers = localStorage.getItem(this.usersKey);
    return storedUsers ? JSON.parse(storedUsers) : [];
  }

  private setUsers(users: any[]): void {
    localStorage.setItem(this.usersKey, JSON.stringify(users));
  }

  private get loggedInEmail(): string {
    return localStorage.getItem(this.loggedInEmailKey) || '';
  }

  private set loggedInEmail(email: string) {
    localStorage.setItem(this.loggedInEmailKey, email);
  }

  private getUserKey(email: string): string {
    return `${this.scheduleKeyPrefix}${email}`;
  }

  register(
    nombre: string,
    apellido: string,
    rut: string,
    email: string,
    password: string
  ): string {
    const users = this.getUsers();
    users.push({ nombre, apellido, rut, email, password });
    this.setUsers(users);
    return 'Registro exitoso';
  }

  login(email: string, password: string): boolean {
    try {
      const users = this.getUsers();
      const user = users.find((u) => u.email === email && u.password === password);
      if (user) {
        this.loggedInEmail = user.email;
        this.loadUserSchedule();
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error('Error en el proceso de inicio de sesión:', error);
      return false;
    }
  }

  resetPassword(email: string, newPassword: string) {
    const users = this.getUsers();
    const userIndex = users.findIndex((u) => u.email === email);
    if (userIndex !== -1) {
      users[userIndex].password = newPassword;
      this.setUsers(users);
    }
  }

  getLoggedInEmail(): string {
    return this.loggedInEmail;
  }

  logout() {
    this.loggedInEmail = '';
  }

  getUserByEmail(email: string) {
    const users = this.getUsers();
    return users.find((u) => u.email === email);
  }

  updateSchedule(updatedSchedule: any) {
    const loggedInEmail = this.loggedInEmail;
    const userKey = this.getUserKey(loggedInEmail);
    localStorage.setItem(userKey, JSON.stringify(updatedSchedule));
    this.schedule$.next({ ...updatedSchedule });
    console.log('Schedule updated:', updatedSchedule);
  }

  loadUserSchedule() {
    const loggedInEmail = this.loggedInEmail;
    const userKey = this.getUserKey(loggedInEmail);
    const storedUserSchedule = localStorage.getItem(userKey);
    this.userSchedule = storedUserSchedule ? JSON.parse(storedUserSchedule) : {};
    this.schedule$.next({ ...this.userSchedule });
  }

  getStoredSchedule(): any {
    const loggedInEmail = this.loggedInEmail;
    const userKey = this.getUserKey(loggedInEmail);
    const storedSchedule = localStorage.getItem(userKey);
    return storedSchedule ? JSON.parse(storedSchedule) : {};
  }

  getClassesOfCurrentDay(): any[] {
    const today = new Date();
    const daysOfWeek = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
    const dayOfWeek = daysOfWeek[today.getDay()];
    if (!this.userSchedule) {
      this.userSchedule = {};
    }
    return this.userSchedule[dayOfWeek] || [];
  }

  getScheduleObservable(): Observable<any> {
    return this.scheduleObservable;
  }

  setSelectedClass(selectedClass: any): void {
    localStorage.setItem(this.selectedClassKey, JSON.stringify(selectedClass));
    this.selectedClass$.next(selectedClass);
  }

    // Método para obtener la clase seleccionada
  getSelectedClass(): any {
    const storedClass = localStorage.getItem(this.selectedClassKey);
    return storedClass ? JSON.parse(storedClass) : null;
  }

  // Método para borrar la clase seleccionada
  clearSelectedClass(): void {
    localStorage.removeItem(this.selectedClassKey);
    this.selectedClass$.next(null);
  }

  clearSelectedForm(): void {
    this.selectedClass = null;
    this.selectedClass$.next(null);
  }

  
}