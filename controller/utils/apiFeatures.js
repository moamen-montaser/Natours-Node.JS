class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }
  filter() {
    //ana hfelo query f el url feh shwayed params, bs momken yb2a
    //m3ahom shwayat fields bs obejts zy maslan sort aw limit
    //fana 3ayzo yfr2 ben el params bta3t el query w el fields
    //1st h3ml copy mn el req.query elly hwa kol el fe el url
    const queryObj = { ...this.queryString }; //btt3ml kda el copy mn obj
    const excludedFields = ['page', 'sort', 'limit', 'fields']; //fields
    //h-loop w ashelhom b7es el queryObj ykon fel el params bs
    excludedFields.forEach((el) => {
      delete queryObj[el];
    });
    console.log(queryObj);

    //tab ana 3ayz a3ml advance filtering maslan gte aw lt aw lte
    //f bkteb f el url maslan > duration[gte]=3
    //bs da fel req.query bytl3 na2s 7aga 3shan a7oto gwa el find
    //elly hytl3 mn req.query >
    // {difficulty:'easy',duration {gte : '5'}}
    //bs ana 3ayz elly gwa el duration> $gte,, far2 el $ bs

    //fana ha7wel el object l string w b3den a3ml replace>
    let queryStr = JSON.stringify(queryObj);
    //el regex elgay> el \b elle f el awel w el akher dy m3naha yb2o
    //lw7dohom y3ne msh f nos kelma,, w ele gwa el callback fn da bzod $ bs
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    console.log(JSON.parse(queryStr));

    //hat el query da w lw edeto find fadya y3ne hat kol elly f el DB
    this.query = this.query.find(JSON.parse(queryStr)); //el queryObj dlwaty gwah
    //object da> {difficulty:'easy',duration:5}
    return this;
  }
  sort() {
    //sorting
    if (this.queryString.sort) {
      // ?sort=duration,price
      const sortBy = this.queryString.sort.split(',').join(' ');
      //ana mdelo 7agten y-sort 3lehom, fana fasel benhom b comma fel url
      //3mlt split w gm3tohom b space
      this.query = this.query.sort(sortBy); //elly gwa el sort arr of price w ratingsAverage
    } else {
      this.query = this.query.sort('-createdAt'); //lw mdtosh parm y-sort 3leh
      //hwa by default hy-sort by createdAt
    }
    return this;
  }
  limitFields() {
    //Field Limiting
    if (this.queryString.fields) {
      // ?fields=duration,difficulty,price
      const fields = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v'); //fe key esmo __v da built-in mongoose
      //ana 3mlt minus hwa y3ne hat kolo ma3da hwa
    }
    return this;
  }
  paginate() {
    //Pagination
    // ?page=2&limit=10  > 1-10 page 1 , 11-20 page 2 , 21-30 page 3
    const page = this.queryString.page * 1 || 1; //7welha number w hya by default 1
    const limit = this.queryString.limit * 1 || 100; //7welha number w hya by default 1
    const skip = (page - 1) * limit; //eqn efhamha aw la2 3ady

    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}

module.exports = APIFeatures;
