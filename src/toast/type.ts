

export interface TToastProps {
   intent: 'info' | 'success' | 'warning' | 'error',
   position: 'bottom' | 'top'
   offet: {horizontal: number,vertical: number},
   timeout:number,
}