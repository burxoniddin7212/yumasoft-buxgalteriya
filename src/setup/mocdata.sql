
  Terminaldan superAdmin qo'shish

insert into users(first_name,last_name,number,password,role) values('Yusuf','Isroilov','998977200821','5e12bb77252edba45493f6da13914a6328984c4576e8a84829c7d57b50c27040','superAdmin');

password=yusuf1993 

---------------


usd_kurs

insert into common(name,text) values ('usd_kurs','11624'); 


// data baza uchun indexes larni ishlatib beradi

set enable_seqscan = off;




 const [notes, notes2] = await Promise.all([
      this.notesEntity.find({
        where: { status },
        skip,
        take: +limit,
      }),
      this.notesEntity.find({
        where: { status },
        skip,
        take: +limit,
      }),
    ]);







SELECT indexname, indexdef
FROM pg_indexes
WHERE tablename = 'notes';

