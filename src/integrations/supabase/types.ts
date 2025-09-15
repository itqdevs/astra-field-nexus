export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      daily_reports: {
        Row: {
          agent_id: string
          businesses_visited: number | null
          challenges_faced: string | null
          competitive_intelligence: string | null
          created_at: string
          follow_ups_completed: number | null
          id: string
          kilometers_traveled: number | null
          materials_distributed: number | null
          meetings_held: number | null
          new_leads_generated: number | null
          next_day_plan: string | null
          opportunities_identified: string | null
          report_date: string
          total_hours: number | null
          updated_at: string
        }
        Insert: {
          agent_id: string
          businesses_visited?: number | null
          challenges_faced?: string | null
          competitive_intelligence?: string | null
          created_at?: string
          follow_ups_completed?: number | null
          id?: string
          kilometers_traveled?: number | null
          materials_distributed?: number | null
          meetings_held?: number | null
          new_leads_generated?: number | null
          next_day_plan?: string | null
          opportunities_identified?: string | null
          report_date: string
          total_hours?: number | null
          updated_at?: string
        }
        Update: {
          agent_id?: string
          businesses_visited?: number | null
          challenges_faced?: string | null
          competitive_intelligence?: string | null
          created_at?: string
          follow_ups_completed?: number | null
          id?: string
          kilometers_traveled?: number | null
          materials_distributed?: number | null
          meetings_held?: number | null
          new_leads_generated?: number | null
          next_day_plan?: string | null
          opportunities_identified?: string | null
          report_date?: string
          total_hours?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      expenses: {
        Row: {
          amount: number
          approved_by: string | null
          approved_date: string | null
          category: string
          created_at: string
          currency: string | null
          description: string
          expense_date: string
          id: string
          latitude: number | null
          lead_id: string | null
          location: string | null
          longitude: number | null
          receipt_url: string | null
          reimbursement_date: string | null
          rejection_reason: string | null
          status: Database["public"]["Enums"]["expense_status"] | null
          subcategory: string | null
          submitted_by: string
          task_id: string | null
          updated_at: string
        }
        Insert: {
          amount: number
          approved_by?: string | null
          approved_date?: string | null
          category: string
          created_at?: string
          currency?: string | null
          description: string
          expense_date: string
          id?: string
          latitude?: number | null
          lead_id?: string | null
          location?: string | null
          longitude?: number | null
          receipt_url?: string | null
          reimbursement_date?: string | null
          rejection_reason?: string | null
          status?: Database["public"]["Enums"]["expense_status"] | null
          subcategory?: string | null
          submitted_by: string
          task_id?: string | null
          updated_at?: string
        }
        Update: {
          amount?: number
          approved_by?: string | null
          approved_date?: string | null
          category?: string
          created_at?: string
          currency?: string | null
          description?: string
          expense_date?: string
          id?: string
          latitude?: number | null
          lead_id?: string | null
          location?: string | null
          longitude?: number | null
          receipt_url?: string | null
          reimbursement_date?: string | null
          rejection_reason?: string | null
          status?: Database["public"]["Enums"]["expense_status"] | null
          subcategory?: string | null
          submitted_by?: string
          task_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "expenses_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "expenses_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "tasks"
            referencedColumns: ["id"]
          },
        ]
      }
      lead_interactions: {
        Row: {
          agent_id: string
          created_at: string
          duration_minutes: number | null
          follow_up_date: string | null
          follow_up_required: boolean | null
          id: string
          interaction_date: string | null
          interaction_type: string
          lead_id: string
          notes: string | null
          outcome: string | null
        }
        Insert: {
          agent_id: string
          created_at?: string
          duration_minutes?: number | null
          follow_up_date?: string | null
          follow_up_required?: boolean | null
          id?: string
          interaction_date?: string | null
          interaction_type: string
          lead_id: string
          notes?: string | null
          outcome?: string | null
        }
        Update: {
          agent_id?: string
          created_at?: string
          duration_minutes?: number | null
          follow_up_date?: string | null
          follow_up_required?: boolean | null
          id?: string
          interaction_date?: string | null
          interaction_type?: string
          lead_id?: string
          notes?: string | null
          outcome?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "lead_interactions_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
        ]
      }
      leads: {
        Row: {
          assigned_agent: string | null
          budget_indication: string | null
          business_address: string | null
          business_size: string | null
          company_name: string
          competitor_info: string | null
          contact_person: string
          conversion_probability: number | null
          created_at: string
          deal_value: number | null
          decision_timeline: string | null
          email: string | null
          first_contact_date: string | null
          id: string
          industry: string | null
          interest_level: number | null
          last_contact_date: string | null
          latitude: number | null
          lead_source: string | null
          longitude: number | null
          next_follow_up: string | null
          notes: string | null
          phone: string
          referring_agent: string | null
          services_interested: string[] | null
          status: Database["public"]["Enums"]["lead_status"] | null
          updated_at: string
          website: string | null
          whatsapp_number: string | null
        }
        Insert: {
          assigned_agent?: string | null
          budget_indication?: string | null
          business_address?: string | null
          business_size?: string | null
          company_name: string
          competitor_info?: string | null
          contact_person: string
          conversion_probability?: number | null
          created_at?: string
          deal_value?: number | null
          decision_timeline?: string | null
          email?: string | null
          first_contact_date?: string | null
          id?: string
          industry?: string | null
          interest_level?: number | null
          last_contact_date?: string | null
          latitude?: number | null
          lead_source?: string | null
          longitude?: number | null
          next_follow_up?: string | null
          notes?: string | null
          phone: string
          referring_agent?: string | null
          services_interested?: string[] | null
          status?: Database["public"]["Enums"]["lead_status"] | null
          updated_at?: string
          website?: string | null
          whatsapp_number?: string | null
        }
        Update: {
          assigned_agent?: string | null
          budget_indication?: string | null
          business_address?: string | null
          business_size?: string | null
          company_name?: string
          competitor_info?: string | null
          contact_person?: string
          conversion_probability?: number | null
          created_at?: string
          deal_value?: number | null
          decision_timeline?: string | null
          email?: string | null
          first_contact_date?: string | null
          id?: string
          industry?: string | null
          interest_level?: number | null
          last_contact_date?: string | null
          latitude?: number | null
          lead_source?: string | null
          longitude?: number | null
          next_follow_up?: string | null
          notes?: string | null
          phone?: string
          referring_agent?: string | null
          services_interested?: string[] | null
          status?: Database["public"]["Enums"]["lead_status"] | null
          updated_at?: string
          website?: string | null
          whatsapp_number?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          department: string | null
          email: string
          full_name: string
          hire_date: string | null
          id: string
          is_active: boolean | null
          phone: string | null
          role: Database["public"]["Enums"]["user_role"]
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          department?: string | null
          email: string
          full_name: string
          hire_date?: string | null
          id?: string
          is_active?: boolean | null
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          department?: string | null
          email?: string
          full_name?: string
          hire_date?: string | null
          id?: string
          is_active?: boolean | null
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      tasks: {
        Row: {
          actual_hours: number | null
          assigned_by: string | null
          assigned_to: string
          completed_date: string | null
          created_at: string
          description: string | null
          due_date: string | null
          estimated_hours: number | null
          id: string
          lead_id: string | null
          priority: Database["public"]["Enums"]["priority_level"] | null
          status: Database["public"]["Enums"]["task_status"] | null
          tags: string[] | null
          title: string
          updated_at: string
        }
        Insert: {
          actual_hours?: number | null
          assigned_by?: string | null
          assigned_to: string
          completed_date?: string | null
          created_at?: string
          description?: string | null
          due_date?: string | null
          estimated_hours?: number | null
          id?: string
          lead_id?: string | null
          priority?: Database["public"]["Enums"]["priority_level"] | null
          status?: Database["public"]["Enums"]["task_status"] | null
          tags?: string[] | null
          title: string
          updated_at?: string
        }
        Update: {
          actual_hours?: number | null
          assigned_by?: string | null
          assigned_to?: string
          completed_date?: string | null
          created_at?: string
          description?: string | null
          due_date?: string | null
          estimated_hours?: number | null
          id?: string
          lead_id?: string | null
          priority?: Database["public"]["Enums"]["priority_level"] | null
          status?: Database["public"]["Enums"]["task_status"] | null
          tags?: string[] | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "tasks_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
        ]
      }
      territories: {
        Row: {
          assigned_agent: string | null
          coverage_area: string | null
          created_at: string
          description: string | null
          id: string
          is_active: boolean | null
          monthly_target_leads: number | null
          name: string
          target_businesses: number | null
          updated_at: string
        }
        Insert: {
          assigned_agent?: string | null
          coverage_area?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean | null
          monthly_target_leads?: number | null
          name: string
          target_businesses?: number | null
          updated_at?: string
        }
        Update: {
          assigned_agent?: string | null
          coverage_area?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean | null
          monthly_target_leads?: number | null
          name?: string
          target_businesses?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          assigned_at: string | null
          assigned_by: string | null
          id: string
          role: Database["public"]["Enums"]["user_role"]
          user_id: string
        }
        Insert: {
          assigned_at?: string | null
          assigned_by?: string | null
          id?: string
          role: Database["public"]["Enums"]["user_role"]
          user_id: string
        }
        Update: {
          assigned_at?: string | null
          assigned_by?: string | null
          id?: string
          role?: Database["public"]["Enums"]["user_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["user_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      expense_status: "pending" | "approved" | "rejected" | "reimbursed"
      lead_status:
        | "new_lead"
        | "interested"
        | "in_progress"
        | "closed_deal"
        | "dormant"
        | "lost"
      priority_level: "low" | "medium" | "high" | "urgent"
      task_status: "pending" | "in_progress" | "completed" | "cancelled"
      user_role: "admin" | "team_lead" | "field_agent" | "finance"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      expense_status: ["pending", "approved", "rejected", "reimbursed"],
      lead_status: [
        "new_lead",
        "interested",
        "in_progress",
        "closed_deal",
        "dormant",
        "lost",
      ],
      priority_level: ["low", "medium", "high", "urgent"],
      task_status: ["pending", "in_progress", "completed", "cancelled"],
      user_role: ["admin", "team_lead", "field_agent", "finance"],
    },
  },
} as const
