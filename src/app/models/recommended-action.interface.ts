// export class RecommendedAction {
// }


export interface RecommendedAction {
  id: string;
  action: string;
  priority: 'immediate' | 'asap' | 'conditional';
  condition?: string;
  completed?: boolean;
}