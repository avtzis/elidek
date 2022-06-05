-----------
-- 3.8
-----------

INSERT INTO `ergo_ereu` (`ergo_id`, `ereu_id`) VALUES ('14', '44'), ('48', '44'), ('9', '44'), ('7', '44'), ('49', '44'), ('17', '44'), ('50', '44');
INSERT INTO `ergo_ereu` (`ergo_id`, `ereu_id`) VALUES ('14', '42'), ('48', '42'), ('9', '42'), ('7', '42'), ('49', '42'), ('17', '42'), ('50', '42');
INSERT INTO `ergo_ereu` (`ergo_id`, `ereu_id`) VALUES ('14', '89'), ('48', '89'), ('9', '89'), ('7', '89'), ('49', '89'), ('17', '89'), ('50', '89');
INSERT INTO `ergo_ereu` (`ergo_id`, `ereu_id`) VALUES ('14', '23'), ('48', '23'), ('9', '23'), ('7', '23'), ('49', '23'), ('17', '23'), ('50', '23');
INSERT INTO `ergo_ereu` (`ergo_id`, `ereu_id`) VALUES ('14', '56'), ('48', '56'), ('9', '56'), ('7', '56'), ('49', '56');
INSERT INTO `ergo_ereu` (`ergo_id`, `ereu_id`) VALUES ('14', '69'), ('48', '69'), ('9', '69'), ('7', '69'), ('49', '69'), ('17', '69');


SELECT ergo.id, ergo.τιτλος FROM ergo except (SELECT ergo.id, ergo.τιτλος FROM ergo INNER JOIN paradoteo ON ergo.id = paradoteo.ergo_id);

select ereunitis.id, ereunitis.ονομα, count(*) as arithmos_ergwn from ergo_ereu inner join ereunitis on ergo_ereu.ereu_id = ereunitis.id group by ereunitis.id, ereunitis.ονομα HAVING count(*) >= 5;



select ereunitis.id, ereunitis.ονομα, ereunitis.επωνυμο, count(*), ergo.τιτλος as arithmos_ergwn_xwris_paradotea from ergo_ereu inner join ereunitis on ergo_ereu.ereu_id = ereunitis.id right join ergo on ergo_ereu.ergo_id = ergo.id where (ergo.id, ergo.τιτλος) in (SELECT ergo.id, ergo.τιτλος FROM ergo except (SELECT ergo.id, ergo.τιτλος FROM ergo INNER JOIN paradoteo ON ergo.id = paradoteo.ergo_id)) group by ereunitis.id, ereunitis.ονομα HAVING count(*) >= 5;

--
select ereunitis.id, ereunitis.ονομα, ereunitis.επωνυμο, count(*) as arithmos_ergwn_xwris_paradotea from ergo_ereu inner join ereunitis on ergo_ereu.ereu_id = ereunitis.id inner join ergo on ergo_ereu.ergo_id = ergo.id
where (ergo.id, ereunitis.id) not in (SELECT ergo.id, ereunitis.id FROM ergo inner join ergo_ereu on ergo_ereu.ergo_id = ergo.id inner join ereunitis on ereunitis.id = ergo_ereu.ereu_id INNER JOIN paradoteo ON ergo.id = paradoteo.ergo_id)
group by ereunitis.id, ereunitis.ονομα HAVING count(*) >= 5
order by count(*) DESC
limit 5;
--









-----------
-- 3.6
-----------

--
select ereunitis.id, ereunitis.ονομα, ereunitis.επωνυμο, ereunitis.ηλικια, count(*) as arithmos_ergwn from ergo_ereu inner join ereunitis on ergo_ereu.ereu_id = ereunitis.id 
where (ereunitis.ηλικια < 40) 
group by ereunitis.id, ereunitis.ονομα
order by count(*) DESC
limit 5;
--









------------
-- 3.5
------------

-----
select DISTINCT p1.ονομα, p2.ονομα, SUM(ergo.ποσο_επιχορηγησης), group_concat(ergo.τιτλος SEPARATOR ', ') 
from pedio p1 
left outer join ergo_pedio l1 on p1.id=l1.pedio_id 
inner join ergo on l1.ergo_id=ergo.id 
inner join ergo_pedio l2 on ergo.id = l2.ergo_id 
inner join pedio p2 on l2.pedio_id = p2.id and p2.id > p1.id 
GROUP by p1.ονομα, p2.ονομα
order by SUM(ergo.ποσο_επιχορηγησης) DESC
limit 5;
------





----------
-- 3.3
----------

-- ΑΝΘΡΟΠΟΛΟΓΙΑ --

-----
select pedio.ονομα, group_concat(ergo.τιτλος SEPARATOR ', ')
from pedio
left outer join ergo_pedio l on pedio.id=l.pedio_id
inner join ergo on l.ergo_id=ergo.id and ergo.ενεργο = 1
group by pedio.ονομα;
-----

-----
select pedio.ονομα, ergo.τιτλος, ergo.διαρκεια, ergo.ενεργο, group_concat(concat(ereunitis.ονομα, _utf8' ', ereunitis.επωνυμο) SEPARATOR ', ')
from ergo 
left outer join ergo_pedio l1 on l1.ergo_id=ergo.id
inner join pedio on pedio.id=l1.pedio_id and pedio.ονομα = '?'
left outer join ergo_ereu l2 on l2.ergo_id=ergo.id
inner join ereunitis on ereunitis.id=l2.ereu_id
where (ergo.διαρκεια <= 1 and ergo.ενεργο = 1)
group by ergo.τιτλος;
-----

-----
select pedio.ονομα, concat(ereunitis.ονομα, _utf8' ', ereunitis.επωνυμο), group_concat(ergo.τιτλος SEPARATOR ', ')
from ergo 
left outer join ergo_pedio l1 on l1.ergo_id=ergo.id
inner join pedio on pedio.id=l1.pedio_id and pedio.ονομα = '?'
left outer join ergo_ereu l2 on l2.ergo_id=ergo.id
inner join ereunitis on ereunitis.id=l2.ereu_id
where (ergo.διαρκεια <= 1 and ergo.ενεργο = 1)
group by concat(ereunitis.ονομα, _utf8' ', ereunitis.επωνυμο);
-----






---------------
-- 3.2
---------------

-----
select ereunitis.id, ereunitis.ονομα, ereunitis.επωνυμο, ereunitis.φυλο, ereunitis.ηλικια, group_concat(ergo.τιτλος SEPARATOR ', ')
from ereunitis
left outer join ergo_ereu l on l.ereu_id=ereunitis.id
inner join ergo on ergo.id=l.ergo_id
group by ereunitis.id
-----

-----
select pedio.ονομα, group_concat(ergo.τιτλος SEPARATOR ', ')
from pedio
left outer join ergo_pedio l on pedio.id=l.pedio_id
inner join ergo on l.ergo_id=ergo.id and ergo.ενεργο = 1
group by pedio.ονομα;
-----








------------
-- 3.1
------------

-----
select ergo.τιτλος, ereunitis.id, ereunitis.ονομα, ereunitis.επωνυμο, ereunitis.φυλο, ereunitis.ηλικια, ereunitis.οργανισμος_ημερομηνια_εναρξης, organismos.ονομα
from ereunitis
inner join organismos on organismos.id=ereunitis.org_id
left outer join ergo_ereu l on l.ereu_id=ereunitis.id
inner join ergo on ergo.id=l.ergo_id and ergo.τιτλος = '?'
group by ereunitis.id
-----







-------------
-- 3.7
-------------

-----
select concat(stelexos.ονομα, _utf8' ', stelexos.επωνυμο), organismos.ονομα, sum(ergo.ποσο_επιχορηγησης)
from stelexos
inner join ergo on ergo.stel_id = stelexos.id
inner join organismos on organismos.id = ergo.org_id and organismos.τυπος = 'ΕΤΑΙΡΙΑ'
group by concat(stelexos.ονομα, _utf8' ', stelexos.επωνυμο)
order by sum(ergo.ποσο_επιχορηγησης) DESC
limit 5;
-----








-------------
-- 3.4
-------------



select organismos.ονομα
from organismos
where (
      (org_erga_in_year(2012, organismos.id) = org_erga_in_year(2013, organismos.id) and org_erga_in_year(2012, organismos.id) >= 10)
   or (org_erga_in_year(2013, organismos.id) = org_erga_in_year(2014, organismos.id) and org_erga_in_year(2013, organismos.id) >= 10)
   or (org_erga_in_year(2014, organismos.id) = org_erga_in_year(2015, organismos.id) and org_erga_in_year(2014, organismos.id) >= 10)
   or (org_erga_in_year(2015, organismos.id) = org_erga_in_year(2016, organismos.id) and org_erga_in_year(2015, organismos.id) >= 10)
   or (org_erga_in_year(2016, organismos.id) = org_erga_in_year(2017, organismos.id) and org_erga_in_year(2016, organismos.id) >= 10)
   or (org_erga_in_year(2017, organismos.id) = org_erga_in_year(2018, organismos.id) and org_erga_in_year(2017, organismos.id) >= 10)
   or (org_erga_in_year(2018, organismos.id) = org_erga_in_year(2019, organismos.id) and org_erga_in_year(2018, organismos.id) >= 10)
   or (org_erga_in_year(2019, organismos.id) = org_erga_in_year(2020, organismos.id) and org_erga_in_year(2019, organismos.id) >= 10)
   or (org_erga_in_year(2020, organismos.id) = org_erga_in_year(2021, organismos.id) and org_erga_in_year(2020, organismos.id) >= 10)
   or (org_erga_in_year(2021, organismos.id) = org_erga_in_year(2022, organismos.id) and org_erga_in_year(2021, organismos.id) >= 10)
)
group by organismos.ονομα



select organismos.ονομα, org_erga_in_year(2012, organismos.id) as e2012, org_erga_in_year(2013, organismos.id) as e2013, org_erga_in_year(2014, organismos.id) as e2014, org_erga_in_year(2015, organismos.id) as e2015, org_erga_in_year(2016, organismos.id) as e2016, org_erga_in_year(2017, organismos.id) as e2017, org_erga_in_year(2018, organismos.id) as e2018, org_erga_in_year(2019, organismos.id) as e2019, org_erga_in_year(2020, organismos.id) as e2020, org_erga_in_year(2021, organismos.id) as e2021, org_erga_in_year(2022, organismos.id)  as e2022
from organismos
where (
      (org_erga_in_year(2012, organismos.id) = org_erga_in_year(2013, organismos.id) and org_erga_in_year(2012, organismos.id) >= 10)
   or (org_erga_in_year(2013, organismos.id) = org_erga_in_year(2014, organismos.id) and org_erga_in_year(2013, organismos.id) >= 10)
   or (org_erga_in_year(2014, organismos.id) = org_erga_in_year(2015, organismos.id) and org_erga_in_year(2014, organismos.id) >= 10)
   or (org_erga_in_year(2015, organismos.id) = org_erga_in_year(2016, organismos.id) and org_erga_in_year(2015, organismos.id) >= 10)
   or (org_erga_in_year(2016, organismos.id) = org_erga_in_year(2017, organismos.id) and org_erga_in_year(2016, organismos.id) >= 10)
   or (org_erga_in_year(2017, organismos.id) = org_erga_in_year(2018, organismos.id) and org_erga_in_year(2017, organismos.id) >= 10)
   or (org_erga_in_year(2018, organismos.id) = org_erga_in_year(2019, organismos.id) and org_erga_in_year(2018, organismos.id) >= 10)
   or (org_erga_in_year(2019, organismos.id) = org_erga_in_year(2020, organismos.id) and org_erga_in_year(2019, organismos.id) >= 10)
   or (org_erga_in_year(2020, organismos.id) = org_erga_in_year(2021, organismos.id) and org_erga_in_year(2020, organismos.id) >= 10)
   or (org_erga_in_year(2021, organismos.id) = org_erga_in_year(2022, organismos.id) and org_erga_in_year(2021, organismos.id) >= 10)
)
group by organismos.ονομα