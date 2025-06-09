# c:\local\SOFTWARE_DEV\current\zoomout\zoomout_v1\models\structures.py

from dataclasses import dataclass
from typing import Optional, List
from datetime import datetime

@dataclass
class Structure:
    structure_id: str
    structure_name: str
    structure_type: str
    subtype: str
    description: str
    historical_range: str
    embedded_contradictions: str
    linked_struggles: str
    linked_entities: Optional[str]
    structure_evolution: str
    confidence: str
    narratives_shaped_by_structure: Optional[str]

    def parse_historical_range(self) -> tuple[int, int]:
        """Convert historical range string to start and end years"""
        years = self.historical_range.split('–')
        return int(years[0]), int(years[1]) if len(years) > 1 else None

class StructureRepository:
    def __init__(self):
        self.structures = {}
        self._load_initial_data()

    def _load_initial_data(self):
        initial_data = [
            Structure(
                "STR-CVD-01",
                "Rise of OBC Political Assertion (e.g., SP, RJD, JD(U))",
                "Political Superstructure",
                "Electoral Strategy",
                "Rise of OBC-led parties asserting caste identity within electoral politics post-Mandal Commission.",
                "1990–1999",
                "CON-073",
                "STRUG-001 (Dalit-Bahujan Assertion)",
                "",
                "Emerged from Mandal Commission's implementation and OBC consolidation in politics.",
                "Medium",
                ""
            ),
            # ... remaining structures would be initialized here ...
        ]
        
        for structure in initial_data:
            self.structures[structure.structure_id] = structure

    def get_by_id(self, structure_id: str) -> Optional[Structure]:
        return self.structures.get(structure_id)

    def get_by_type(self, structure_type: str) -> List[Structure]:
        return [s for s in self.structures.values() if s.structure_type == structure_type]

    def get_by_date_range(self, start_year: int, end_year: int) -> List[Structure]:
        results = []
        for structure in self.structures.values():
            struct_start, struct_end = structure.parse_historical_range()
            if struct_start <= end_year and (struct_end is None or struct_end >= start_year):
                results.append(structure)
        return results