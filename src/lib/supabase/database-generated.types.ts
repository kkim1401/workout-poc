/* eslint-disable no-unused-vars */
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: '12.2.3 (519615d)';
  };
  public: {
    Tables: {
      exercises: {
        Row: {
          common_exercise_id: string | null;
          created_at: string | null;
          description: string | null;
          id: string;
          name: string;
          user_id: string | null;
        };
        Insert: {
          common_exercise_id?: string | null;
          created_at?: string | null;
          description?: string | null;
          id?: string;
          name: string;
          user_id?: string | null;
        };
        Update: {
          common_exercise_id?: string | null;
          created_at?: string | null;
          description?: string | null;
          id?: string;
          name?: string;
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
      set_instances: {
        Row: {
          completed_at: string | null;
          created_at: string | null;
          exercise_id: string;
          exercise_name: string;
          id: string;
          notes: string | null;
          order_in_workout: number;
          reps_actual: number | null;
          reps_target: number | null;
          rpe_actual: number | null;
          rpe_target: number | null;
          set_template_id: string | null;
          user_id: string | null;
          weight_actual: number | null;
          weight_target: number | null;
          workout_instance_id: string;
        };
        Insert: {
          completed_at?: string | null;
          created_at?: string | null;
          exercise_id: string;
          exercise_name: string;
          id?: string;
          notes?: string | null;
          order_in_workout: number;
          reps_actual?: number | null;
          reps_target?: number | null;
          rpe_actual?: number | null;
          rpe_target?: number | null;
          set_template_id?: string | null;
          user_id?: string | null;
          weight_actual?: number | null;
          weight_target?: number | null;
          workout_instance_id: string;
        };
        Update: {
          completed_at?: string | null;
          created_at?: string | null;
          exercise_id?: string;
          exercise_name?: string;
          id?: string;
          notes?: string | null;
          order_in_workout?: number;
          reps_actual?: number | null;
          reps_target?: number | null;
          rpe_actual?: number | null;
          rpe_target?: number | null;
          set_template_id?: string | null;
          user_id?: string | null;
          weight_actual?: number | null;
          weight_target?: number | null;
          workout_instance_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'set_instances_exercise_id_fkey';
            columns: ['exercise_id'];
            isOneToOne: false;
            referencedRelation: 'exercises';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'set_instances_set_template_id_fkey';
            columns: ['set_template_id'];
            isOneToOne: false;
            referencedRelation: 'set_templates';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'set_instances_workout_instance_id_fkey';
            columns: ['workout_instance_id'];
            isOneToOne: false;
            referencedRelation: 'workout_instances';
            referencedColumns: ['id'];
          },
        ];
      };
      set_templates: {
        Row: {
          created_at: string | null;
          exercise_id: string;
          exercise_name: string;
          id: string;
          order_in_workout: number | null;
          reps_target: number;
          rpe_target: number | null;
          user_id: string | null;
          weight_target: number | null;
          workout_template_id: string;
        };
        Insert: {
          created_at?: string | null;
          exercise_id: string;
          exercise_name: string;
          id?: string;
          order_in_workout?: number | null;
          reps_target: number;
          rpe_target?: number | null;
          user_id?: string | null;
          weight_target?: number | null;
          workout_template_id: string;
        };
        Update: {
          created_at?: string | null;
          exercise_id?: string;
          exercise_name?: string;
          id?: string;
          order_in_workout?: number | null;
          reps_target?: number;
          rpe_target?: number | null;
          user_id?: string | null;
          weight_target?: number | null;
          workout_template_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'set_templates_workout_template_id_fkey';
            columns: ['workout_template_id'];
            isOneToOne: false;
            referencedRelation: 'workout_templates';
            referencedColumns: ['id'];
          },
        ];
      };
      workout_instances: {
        Row: {
          completed_at: string | null;
          created_at: string;
          description: string | null;
          id: string;
          notes: string | null;
          order_in_plan: number | null;
          started_at: string;
          user_id: string;
          workout_template_id: string;
        };
        Insert: {
          completed_at?: string | null;
          created_at?: string;
          description?: string | null;
          id?: string;
          notes?: string | null;
          order_in_plan?: number | null;
          started_at?: string;
          user_id: string;
          workout_template_id: string;
        };
        Update: {
          completed_at?: string | null;
          created_at?: string;
          description?: string | null;
          id?: string;
          notes?: string | null;
          order_in_plan?: number | null;
          started_at?: string;
          user_id?: string;
          workout_template_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'workout_instances_workout_template_id_fkey';
            columns: ['workout_template_id'];
            isOneToOne: false;
            referencedRelation: 'workout_templates';
            referencedColumns: ['id'];
          },
        ];
      };
      workout_templates: {
        Row: {
          created_at: string | null;
          description: string | null;
          id: string;
          name: string;
          plan_id: string | null;
          user_id: string | null;
        };
        Insert: {
          created_at?: string | null;
          description?: string | null;
          id?: string;
          name: string;
          plan_id?: string | null;
          user_id?: string | null;
        };
        Update: {
          created_at?: string | null;
          description?: string | null;
          id?: string;
          name?: string;
          plan_id?: string | null;
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
      create_workout: {
        Args: { name: string; workout_exercises: Json };
        Returns: string;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DatabaseWithoutInternals = Omit<Database, '__InternalSupabase'>;

type DefaultSchema = DatabaseWithoutInternals[Extract<
  keyof Database,
  'public'
>];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema['Tables'] &
        DefaultSchema['Views'])
    ? (DefaultSchema['Tables'] &
        DefaultSchema['Views'])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema['Enums']
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums'][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums']
    ? DefaultSchema['Enums'][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema['CompositeTypes']
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema['CompositeTypes']
    ? DefaultSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  public: {
    Enums: {},
  },
} as const;
