export class Company {
  id: number;
  name: string;
  pocName: string;
  pocEmail: string;
  location: string;
  website: string;

constructor(
  id: number=0,
  name: string='',
  pocName: string='',
  pocEmail: string='',
  location: string='',
  website: string=''
) {
this.id = id;
this.name = name;
this.pocName = pocName;
this.pocEmail = pocEmail;
this.location = location;
this.website = website;
}

}

