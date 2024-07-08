export class Recipe {
    title: string;
    description: string;
    createdDate: Date;
    snaps: number;
    imageUrl: string;
    location?: string;
    id: number;

    
    constructor(title: string, description: string, imageUrl: string, createdDate: Date, snaps: number,id: number) {
      this.title = title;
      this.description = description;
      this.imageUrl = imageUrl;
      this.createdDate = createdDate;
      this.snaps = snaps;
      this.id = id;
    }

    addSnap(): void {
        this.snaps++;
      }
    
      removeSnap(): void {
        this.snaps--;
      }

      setLocation(location: string): void {
        this.location = location;
      }

      withLocation(location: string): Recipe {
        this.setLocation(location);
        return this;
      }
      
  }