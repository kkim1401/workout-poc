/* eslint-disable no-unused-vars */
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      exercises: {
        Row: {
          common_exercise_id: string | null;
          created_at: string | null;
          description: string | null;
          id: string;
          name: string | null;
          user_id: string | null;
        };
        Insert: {
          common_exercise_id?: string | null;
          created_at?: string | null;
          description?: string | null;
          id?: string;
          name?: string | null;
          user_id?: string | null;
        };
        Update: {
          common_exercise_id?: string | null;
          created_at?: string | null;
          description?: string | null;
          id?: string;
          name?: string | null;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'exercise_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'exercises_common_exercise_id_fkey';
            columns: ['common_exercise_id'];
            isOneToOne: false;
            referencedRelation: 'exercises';
            referencedColumns: ['id'];
          },
        ];
      };
      plans: {
        Row: {
          created_at: string | null;
          description: string | null;
          id: string;
          name: string | null;
          rating: number | null;
          started_at: string | null;
          status: string | null;
          user_id: string | null;
        };
        Insert: {
          created_at?: string | null;
          description?: string | null;
          id?: string;
          name?: string | null;
          rating?: number | null;
          started_at?: string | null;
          status?: string | null;
          user_id?: string | null;
        };
        Update: {
          created_at?: string | null;
          description?: string | null;
          id?: string;
          name?: string | null;
          rating?: number | null;
          started_at?: string | null;
          status?: string | null;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'plan_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
        ];
      };
      profiles: {
        Row: {
          first_name: string | null;
          id: string;
          last_name: string | null;
          weight: number | null;
        };
        Insert: {
          first_name?: string | null;
          id: string;
          last_name?: string | null;
          weight?: number | null;
        };
        Update: {
          first_name?: string | null;
          id?: string;
          last_name?: string | null;
          weight?: number | null;
        };
        Relationships: [];
      };
      sets: {
        Row: {
          created_at: string | null;
          exercise_id: string | null;
          exercise_name: string;
          id: string;
          reps: number | null;
          rpe: number | null;
          user_id: string | null;
          weight: number | null;
          workout_id: string | null;
        };
        Insert: {
          created_at?: string | null;
          exercise_id?: string | null;
          exercise_name: string;
          id?: string;
          reps?: number | null;
          rpe?: number | null;
          user_id?: string | null;
          weight?: number | null;
          workout_id?: string | null;
        };
        Update: {
          created_at?: string | null;
          exercise_id?: string | null;
          exercise_name?: string;
          id?: string;
          reps?: number | null;
          rpe?: number | null;
          user_id?: string | null;
          weight?: number | null;
          workout_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'set_workout_id_fkey';
            columns: ['workout_id'];
            isOneToOne: false;
            referencedRelation: 'workouts';
            referencedColumns: ['id'];
          },
        ];
      };
      workouts: {
        Row: {
          created_at: string | null;
          description: string | null;
          id: string;
          name: string | null;
          plan_id: string | null;
          started_at: string | null;
          status: string | null;
          user_id: string | null;
        };
        Insert: {
          created_at?: string | null;
          description?: string | null;
          id?: string;
          name?: string | null;
          plan_id?: string | null;
          started_at?: string | null;
          status?: string | null;
          user_id?: string | null;
        };
        Update: {
          created_at?: string | null;
          description?: string | null;
          id?: string;
          name?: string | null;
          plan_id?: string | null;
          started_at?: string | null;
          status?: string | null;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'workout_plan_id_fkey';
            columns: ['plan_id'];
            isOneToOne: false;
            referencedRelation: 'plans';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'workout_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
        ];
      };
    };
    Views: {
      user_visible_exercises: {
        Row: {
          common_exercise_id: string | null;
          created_at: string | null;
          description: string | null;
          id: string | null;
          name: string | null;
          user_id: string | null;
        };
        Relationships: [];
      };
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, 'public'>];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema['Tables'] & PublicSchema['Views'])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] &
        PublicSchema['Views'])
    ? (PublicSchema['Tables'] &
        PublicSchema['Views'])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema['Enums']
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
    ? PublicSchema['Enums'][PublicEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema['CompositeTypes']
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema['CompositeTypes']
    ? PublicSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
    : never;
