/**
 * Auto-generated entity types
 * Contains all CMS collection interfaces in a single file 
 */

/**
 * Collection ID: startups
 * Interface for Startups
 */
export interface Startups {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  startupName?: string;
  /** @wixFieldType text */
  founderName?: string;
  /** @wixFieldType text */
  productServiceDescription?: string;
  /** @wixFieldType text */
  stage?: string;
  /** @wixFieldType number */
  monthlyRecurringRevenue?: number;
  /** @wixFieldType number */
  numberOfUsers?: number;
  /** @wixFieldType text */
  category?: string;
  /** @wixFieldType url */
  contactLink?: string;
}
