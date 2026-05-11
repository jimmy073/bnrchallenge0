package rw.bnr.licensing.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import rw.bnr.licensing.entity.Institution;

import java.util.Optional;

public interface InstitutionRepository extends JpaRepository<Institution, Long> {

    @Override
    Optional<Institution> findById(Long aLong);

    boolean existsByName(String name);
    boolean existsByAbbreviation(String abbr);
    boolean existsByTin(String tin);

}
